import { User } from '../../src/models/user.model';
import { MongoMemoryServer } from 'mongodb-memory-server';

const { Post } = require('../../src/models/post.model');
const { Comment } = require('../../src/models/comment.model');
const mongoose = require('mongoose');



let mongoServer: MongoMemoryServer;


beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Post Model', () => {
  let existingUser: string;
  it('should create a new post', async () => {
    const newUser = await User.create({
      fullName: 'John Doe',
      userName: 'john_doe',
      password: 'securePassword',
      email: 'john.doe@example.com',
      salt: 'randomSalt',
      active: true,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date()
    });

    existingUser = newUser._id.toString();

    const postData = {
      title: 'Test Post',
      author: existingUser,
      content: 'Lorem ipsum',
      active: true,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date(),
    };

    const newPost = await Post.create(postData);

    expect(newPost).toBeDefined();
    expect(newPost.title).toBe('Test Post');
    expect(newPost.content).toBe('Lorem ipsum');
    expect(newPost.active).toBe(true);
  });

  it('should find active posts', async () => {

    const existingUser = await User.findOne();


    const postData = {
      title: 'Active Post',
      author: existingUser,
      content: 'Lorem ipsum',
      active: true,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date(),
    };

    await Post.create(postData);

    const postData2 = {
        title: 'Active Post',
        author: existingUser,
        content: 'Lorem ipsum',
        active: false,
        created: new Date(),
        creator: 'TestUser',
        updated: new Date(),
      };
  
      await Post.create(postData2);

    const activePosts = await Post.findActives();

    expect(activePosts).toHaveLength(2);
    expect(activePosts[0].title).toBe('Test Post');
    expect(activePosts[0].active).toBe(true);
  });

});