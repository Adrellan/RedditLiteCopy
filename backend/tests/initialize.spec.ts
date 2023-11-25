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
  await User.deleteMany({});
  await Post.deleteMany({});
  await Comment.deleteMany({});
  await disconnect();
  

});

describe('Initialize Model Tests', () => {
    it('should create a valid User entity', async () => {
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
      const userId = newUser._id;

      expect(newUser).toBeDefined();
      expect(newUser.fullName).toBe('John Doe');
      expect(newUser.userName).toBe('john_doe');
      expect(newUser.password).toBe('securePassword');
      expect(newUser.email).toBe('john.doe@example.com');
      expect(newUser.salt).toBe('randomSalt');
      expect(newUser.active).toBe(true);
    });
    let userId: string;

    it('should create a valid Post entity', async () => {
        const newPost = await Post.create({
          title: 'Test Post',
          author: userId, // Helyettesítsd a valós user_id-vel
          // Helyettesítsd a valós comment_id-vel
          content: 'Lorem ipsum',
          active: true,
          created: new Date(),
          creator: 'TestUser',
          updated: new Date(),
        });
        const postId = newPost._id;

        expect(newPost).toBeDefined();
        expect(newPost.title).toBe('Test Post');
        expect(newPost.author).toBe(userId);
        expect(newPost.content).toBe('Lorem ipsum');
        expect(newPost.active).toBe(true);
      });
      let postId: string;

      it('should create a valid Comment entity', async () => {
        // Act
        const newComment = await Comment.create({
          text: 'Active Comment',
          author: userId, // Az author ObjectId-jét itt meg kell adni, a tesztedhez alkalmazkodva
          post: postId, // A post ObjectId-jét itt meg kell adni, a tesztedhez alkalmazkodva
          active: true,
          created: new Date(),
          creator: 'TestUser',
          updated: new Date(),
        });
        
        // Assert
        expect(newComment).toBeDefined();
        expect(newComment.text).toBe('Active Comment');
        expect(newComment.active).toBe(true);
      });
     
  });