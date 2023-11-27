import request from 'supertest';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import postRouter from '../../src/controllers/postController'; 
import app from '../../src/index'

const { User, IUser } = require('../../src/models/user.model');
const { Post, IPost } = require('../../src/models/post.model');

const mongoServer = new MongoMemoryServer();

beforeAll(async () => {
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
        title: 'Test Post',
        author: existingUser._id,
        content: 'Lorem ipsum',
        active: true,
        created: new Date(),
        creator: 'TestUser',
        updated: new Date(),
      };
  
      const newPost = await Post.create(postData);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Post Controller Tests', () => {
  it('should get all active posts', async () => {
    const response = await request(app).get('/posts');

    expect(response.status).toBe(200);

  });

  it('should get a specific post by ID', async () => {
    const postId = await Post.findOne();
    const response = await request(app).get(`/posts/${postId._id}`);

    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  });

  it('should create a new post', async () => {
    const postId = await User.findOne();
    const postData = {
      title: 'New Post',
      author: postId._id.toString(),
      content: 'Lorem ipsum',
    };

    const response = await request(app).post('/posts').send(postData);

    expect(response.status).toBe(200);
  });

  it('should modify an existing post', async () => {
    const postId = await Post.findOne();
    const modifiedData = {
      title: 'Modified Post',
      content: 'Updated content',
    };

    const response = await request(app).put(`/posts/${postId._id}`).send(modifiedData);

    //expect(response.status).toBe(200);
    expect(response.body.title).toBe("Modified Post");
    
  });

  it('should delete an existing post', async () => {
    const postId = await Post.findOne();
    const response = await request(app).delete(`/posts/${postId._id}`);

    expect(response.status).toBe(200);
  });
});