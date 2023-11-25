import { IPost, Post } from '../src/models/post.model'; 
import { User } from '../src/models/user.model';
import { Comment } from '../src/models/comment.model';
import { connect, disconnect } from 'mongoose';

beforeAll(async () => {
    await connect('mongodb+srv://daniella123nagy:DvSORSKcyDlZnZpR@cluster0.l5oejw6.mongodb.net/?retryWrites=true&w=majority');
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await User.deleteMany({});
});

afterAll(async () => {

  await Comment.deleteMany({});
  await Post.deleteMany({});
  await User.deleteMany({});
  await disconnect();
  

});
describe('Comment Model Tests', () => {
    let userId: string;
    let postId: string;


    beforeAll(async () => {
        
    // Felhasználó létrehozása és ID-jének eltárolása
    const user = await User.create({
      fullName: 'Test User',
      userName: 'test_user',
      password: 'securePassword',
      email: 'test.user@example.com',
      salt: 'randomSalt',
      active: true,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date(),
    });

    userId = user._id.toString();

    // Poszt létrehozása és ID-jének eltárolása
    const post = await Post.create({
      title: 'Test Post',
      content: 'This is a test post',
      author: userId,
      active: true,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date(),
    });

    postId = post._id.toString();
  });

  it('should find active comments using findActives method', async () => {
  
    await Comment.create({
      text: 'Inactive Comment',
      author: userId,
      post: postId,
      active: false,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date(),
    });

    const activeComments = await Comment.findActives();

    // Assert
    expect(activeComments).toHaveLength(1);
    expect(activeComments[0].text).toBe('Active Comment');
    expect(activeComments[0].active).toBe(true);
  });
  });