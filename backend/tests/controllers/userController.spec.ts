// userController.spec.ts
import request from 'supertest';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../../src/models/user.model';
import router from '../../src/controllers/userController';
import { authenticationMiddleware } from '../../src/middlewares/authentication.mw';

let mongoServer: any;
const app: Express = express();
app.use(express.json());
app.use('/', router);

describe('User Controller', () => {
  let userId: string;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    await mongoServer.start();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        fullName: 'Jane Doe',
        userName: 'jane_doe',
        password: 'securePassword',
        email: 'jane.doe@example.com',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Registration successful.');
  });

  it('should fail to register with invalid data', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        fullName: '',
        userName: 'jane_doe',
        password: 'short',
        email: 'invalidEmail',
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(4);
  });

  it('should fail to log in with valid credentials', async () => {
    const newUser = await User.create({
      fullName: 'John Doe',
      userName: 'john_doe',
      password: 'securePassword',
      email: 'john.doe@example.com',
      salt: 'randomSalt',
      active: true,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date(),
    });
    userId = newUser._id.toString();

    const response = await request(app)
      .post('/login')
      .send({ userName: 'jane_doe', password: 'securePassword' });

    expect(response.status).toBe(200);
  });

  it('should fail to log in with invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ userName: 'john_doe', password: 'wrongPassword' });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid username or password');
  });


  it('should get user by ID', async () => {
    const response = await request(app).get(`/user/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe('John Doe');
  });
  it('should fail to logout', async () => {
    const response = await request(app)
      .get('/logout')
      .expect(401);

  });
  
}); 
