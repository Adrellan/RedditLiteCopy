import { connect, disconnect } from 'mongoose';
import { Post } from '../src/models/post.model';
import { IUser, User } from '../src/models/user.model';
import { Comment } from '../src/models/comment.model';

beforeAll(async () => {
  // Csatlakozás az adatbázishoz
  await connect('mongodb+srv://daniella123nagy:DvSORSKcyDlZnZpR@cluster0.l5oejw6.mongodb.net/?retryWrites=true&w=majority');
  await Post.deleteMany({});
  await Comment.deleteMany({});
  await User.deleteMany({});
});


afterAll(async () => {
  // Adatbázis kapcsolat lezárása
  await Post.deleteMany({});
  await Comment.deleteMany({});
  await User.deleteMany({});
  await disconnect();
});

describe('User Model Tests', () => {
  let userId: string;

  beforeAll(async () => {
   
    // Felhasználó létrehozása és ID-jének eltárolása
    const user = await User.create({
      fullName: 'Active Post',
      userName: 'test_user',
      password: 'securePassword',
      email: 'test.user@example.com',
      salt: 'randomSalt',
      active: true,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date(),
    });
    // Add more assertions as needed
  });

  it('should find active users', async () => {
    const activeUserData: IUser = {
      fullName: 'Active User',
      userName: 'active_user',
      password: 'securePassword',
      email: 'active.user@example.com',
      salt: 'randomSalt',
      active: true,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date(),
    };

    const inactiveUserData: IUser = {
      fullName: 'Inactive User',
      userName: 'inactive_user',
      password: 'securePassword',
      email: 'inactive.user@example.com',
      salt: 'randomSalt',
      active: false,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date(),
    };

    await User.create(activeUserData);
    await User.create(inactiveUserData);

    const activeUsers = await User.findActives();

    expect(activeUsers).toHaveLength(1);
    // Add more assertions as needed
  });
});
