import { Comment } from '../../src/models/comment.model';


const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Post } = require('../../src/models/post.model');
const { User, IUser } = require('../../src/models/user.model');
const { CommentModel, IComment } = require('../../src/models/user.model');


let mongoServer: any;

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    await mongoServer.start();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

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
    const existingUser = await User.findOne();
    const postData = {
      title: 'Active Post',
      author: existingUser._id,
      content: 'Lorem ipsum',
      active: true,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date(),
    };

    await Post.create(postData);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Comment Model Tests', () => {
  it('should create a new comment', async () => {
    const existingUser = await User.findOne();
    const existingPost = await Post.findOne();
    const newComment = await Comment.create({
        text: 'Active Comment',
        author: existingUser._id, 
        post: existingPost._id, 
        active: true,
        created: new Date(),
        creator: 'TestUser',
        updated: new Date(),
      });
      
      expect(newComment).toBeDefined();
      expect(newComment.text).toBe('Active Comment');
      expect(newComment.active).toBe(true);

  });

  it('should find active comments', async () => {
    const activeComments = await Comment.findActives();

    expect(activeComments).toBeDefined();
  });
});
