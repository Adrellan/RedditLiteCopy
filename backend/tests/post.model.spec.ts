import { connect, disconnect } from 'mongoose';
import { Post } from '../src/models/post.model';
import { User } from '../src/models/user.model';
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

describe('Post Model Tests', () => {
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

    userId = user._id.toString();
  });

  it('should find active posts using findActives method', async () => {
    
    await Post.create({
      title: 'Sample Post',
      content: 'This is an inactive test post',
      author: userId,
      active: false,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date(),
    });

    const activePosts = await Post.findActives();

    // Assert
    expect(activePosts).toHaveLength(1);
    expect(activePosts[0].title).toBe('Active Post');
    expect(activePosts[0].active).toBe(true);
  });
});