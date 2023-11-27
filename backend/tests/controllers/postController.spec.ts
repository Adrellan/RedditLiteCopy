import request from 'supertest';
import express, { Express } from 'express';
import mongoose from 'mongoose'; // Biztosítsd, hogy az importok helyesek legyenek
import { Comment } from '../../src/models/comment.model';
import { User } from '../../src/models/user.model';
import { Post } from '../../src/models/post.model';
import { authenticationMiddleware } from '../../src/middlewares/authentication.mw';
import router from '../../src/controllers/commentController'; // Biztosítsd, hogy a router útvonala helyes legyen
import { MongoMemoryServer } from 'mongodb-memory-server';


let mongoServer: any;


const app: Express = express();
app.use(express.json());
app.use('/api/posts', router);

describe('Post Controller', () => {
  let userId: string;
  let postId1: string;
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

  });

  afterAll(async () => {
    // Kapcsolat lezárása és tesztdatabase törlése
   
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should get post by postId', async () => {
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
    const postId  = userId.toString();
    const response = await request(app).get(`/api/posts/${postId1}`);
    expect(response.status).toBe(200);
  });
});
