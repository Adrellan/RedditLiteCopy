import request from 'supertest';
import { Express } from 'express';
import mongoose from 'mongoose';
import app from '../../src/index' ; // Az alkalmazásodat importáld be helyesen
import { IPost, Post } from '../../src/models/post.model'; 
import { User } from '../../src/models/user.model';
import { Comment } from '../../src/models/comment.model';
import { connect, disconnect } from 'mongoose';


describe('Comment API', () => {
  beforeAll(async () => {
    // Kapcsolódás a teszt adatbázishoz vagy inicializáció
    
});

  afterAll(async () => {
    // Adatbázis lekapcsolása és lezárása a tesztek után
    await mongoose.disconnect();
  });
  let userId: string;
  let postId: string;
  let commentId: string;

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

  const userId = user._id;

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

  const comment = await Comment.create({
    text: 'Comment',
    author: userId,
    post: postId,
    active: true,
    created: new Date(),
    creator: 'TestUser',
    updated: new Date(),
  });
    commentId = comment._id.toString();
});


  it('should get all active comments for a post', async () => {
    const response = await request(app).get(`/comments/${postId}`); // Pótoljuk a postId-t a tényleges értékkel
    expect(response.status).toBe(200);
    // További ellenőrzések a válasz tartalmára vonatkozóan
  });

  it('should get a specific comment by ID', async () => {
    const response = await request(app).get(`/comments/${commentId}`);
// Pótoljuk a commentId-t a tényleges értékkel
    expect(response.status).toBe(200);
    // További ellenőrzések a válasz tartalmára vonatkozóan
  });

  it('should create a new comment', async () => {
    const response = await request(app)
      .post('/comments')
      .send({
      });
    expect(response.status).toBe(200);
    // További ellenőrzések a válasz tartalmára vonatkozóan
  });

  it('should update a comment by ID', async () => {
    const response = await request(app)
      .put(`/comments/${commentId}`) // Pótoljuk a commentId-t a tényleges értékkel
      .send({
        // Itt küldjük el a modifiedComment objektumot a teszt számára
      });
    expect(response.status).toBe(200);
    // További ellenőrzések a válasz tartalmára vonatkozóan
  });

  it('should delete a comment by ID', async () => {
    const response = await request(app).delete(`/comments/${commentId}`); // Pótoljuk a commentId-t a tényleges értékkel
    expect(response.status).toBe(200);
    // További ellenőrzések a válasz tartalmára vonatkozóan
  });
  it('should create a new post', async () => {
    const response = await request(app)
    .post('/posts')
    .send({
        title: 'My New Post',
        content: 'This is the content of my new post.',
        author: userId
    })
    .set('Cookie', ['AUTH_TOKEN=yourAuthToken; AUTH_SIGNATURE=yourAuthSignature'])
    .expect(200);

    // Validate the response if necessary
    expect(response.status).toBe(200);
});

it('should get all active posts', async () => {
    const response = await request(app)
    .get('/posts')
    .expect(200);

    expect(response.status).toBe(200);
    // Validate the response if necessary
    //expect(response.body).toHaveLength(1);
});

it('should get a post by postId', async () => {

    const response = await request(app)
    .get(`/posts/${postId}`)
    .expect(200);

    // Validate the response if necessary
    //expect(response.body.title).toBe('My New Post');
    expect(response.status).toBe(200);
});

it('should update a post by postId', async () => {

    const response = await request(app)
    .put(`/posts/${postId}`)
    .send({
        title: 'My Updated Post',
        content: 'This is the updated content of my post.'
    })
    .set('Cookie', ['AUTH_TOKEN=yourAuthToken; AUTH_SIGNATURE=yourAuthSignature'])
    .expect(200);

    // Validate the response if necessary
    //expect(response.body.title).toBe('My Updated Post');
    expect(response.status).toBe(200);
});

it('should delete a post by postId', async () => {

    const response = await request(app)
    .delete(`/posts/${postId}`)
    .set('Cookie', ['AUTH_TOKEN=yourAuthToken; AUTH_SIGNATURE=yourAuthSignature'])
    .expect(200);

    // Validate the response if necessary
    //expect(response.body).toHaveProperty('yourProperty');
    expect(response.status).toBe(200);
});

});
