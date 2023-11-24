import request from 'supertest';
import app from '../src/index';
import * as path from 'path';


const settings = require(path.join(process.cwd(), 'package.json'));



describe('API endpoints', () => {
  it('should respond with version at /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain(settings.version);
  });

  it('should respond with 404 at unknown endpoint', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(200);
  });
});