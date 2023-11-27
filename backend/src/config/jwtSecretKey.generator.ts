import crypto from 'crypto';

const generateJwtSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const jwtSecret = generateJwtSecret();
