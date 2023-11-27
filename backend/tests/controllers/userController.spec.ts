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
  
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User Controller Tests', () => {
  it('should successfully log in a user', async () => {
    const response = await request(app)
      .post('/login')
      .send({ userName: 'john_doe', password: 'securePassword' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
  });

  it('should reject login with invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ userName: 'invaliduser', password: 'invalidpassword' });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid username or password');
  });

  it('should successfully register a new user', async () => {
    const newUser: any = {
      fullName: 'New Test User',
      userName: 'newtestuser',
      password: 'newtestpassword',
      email: 'newtest@example.com',
      salt: 'newtestsalt',
    };

    const response = await request(app)
      .post('/register')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Registration successful.');
  });

  it('should reject registration with invalid data', async () => {
    const invalidUser = {
      fullName: '',
      userName: 'testuser', // Existing username
      password: 'short', // Password too short
      email: 'invalidemail', // Invalid email format
    };

    const response = await request(app)
      .post('/register')
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(4); // Number of validation errors
  });

  // További tesztek...
});
