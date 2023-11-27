import request from 'supertest';
import express, { Express } from 'express';
import mongoose from 'mongoose'; 
import { Comment } from '../../src/models/comment.model';
import { User } from '../../src/models/user.model';
import { Post } from '../../src/models/post.model';
import { authenticationMiddleware } from '../../src/middlewares/authentication.mw';
import router from '../../src/controllers/commentController';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { jwtSecret } from '../../src/config/jwtSecretKey.generator';

const jwt = require('jsonwebtoken');

let mongoServer: any;


const app: Express = express();
app.use(express.json());
app.use('/api/comments', router);

describe('Comment Controller', () => {
  let userId: string;
  let postId1: string;
  let postId: string;
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
    userId = newUser._id.toString();

    const postData = {
      title: 'Active Post',
      author: userId,
      content: 'Lorem ipsum',
      active: true,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date(),
    };
    
    const newPost = await Post.create(postData);
    postId1 = newPost._id.toString();
  });

  afterAll(async () => {
    // Kapcsolat lezárása és tesztdatabase törlése
   
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should get comments by postId', async () => {
    const newComment = await Comment.create({
        text: 'Active Comment',
        author: userId, 
        post: postId1, 
        active: true,
        created: new Date(),
        creator: 'TestUser',
        updated: new Date(),
      });
    postId  = userId.toString();
    const response = await request(app).get(`/api/comments/${postId1}`);
    expect(response.status).toBe(200);
  });

  it('should get a comment by commentId', async () => {
    const newComment = await Comment.create({
      text: 'Active Comment',
      author: userId, 
      post: postId1, 
      active: true,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date(),
    });
    const commentId = newComment._id.toString();
    const response = await request(app).get(`/api/comments/${commentId}`);
    expect(response.status).toBe(200);
  });
    
});
