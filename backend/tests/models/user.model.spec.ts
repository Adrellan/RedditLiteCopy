const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { User, IUser } = require('../../src/models/user.model');

let mongoServer: any;


beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    await mongoServer.start();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
describe('User Model Tests', () => {

    it('should create a new user', async () => {
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
  
      expect(newUser).toBeDefined();
      expect(newUser.fullName).toBe('John Doe');
      expect(newUser.userName).toBe('john_doe');
    });
  
    it('should find active users', async () => {
        const newUser2 = await User.create({
            fullName: 'John Doe2',
            userName: 'john_doe2',
            password: 'securePassword',
            email: 'john.doe@example.com',
            salt: 'randomSalt',
            active: false,
            created: new Date(),
            creator: 'TestUser',
            updated: new Date()
          });
      

      const activeUsers = await User.findActives();
  

      expect(activeUsers).toHaveLength(1);
    });
});  