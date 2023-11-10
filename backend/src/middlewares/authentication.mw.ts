/*
* TODO: Implement a authentication middleware with JWT.
*  The JWT will come from TWO cookies.
*  AUTH_TOKEN -> This will contain the payload the JWT Header and Payload Data
*  AUTH_SIGNATURE -> This will contain the JWT signature part.
*  Responsible user: Daniella
*
* */


const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Middleware to parse cookies
app.use(cookieParser());

// JWT authentication middleware
app.use((req: any, res: any, next: any) => {
  const authToken = req.cookies.AUTH_TOKEN;
  const authSignature = req.cookies.AUTH_SIGNATURE;

  if (!authToken || !authSignature) {
    return res.status(401).json({ message: 'Missing JWT cookies.' });
  }

  const token = `${authToken}.${authSignature}`;

  // Verify the JWT using your secret key
  jwt.verify(token, 'your-secret-key', (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid JWT.' });
    }

    // Authentication successful
    req.user = decoded; // Make user data available in the request object
    next();
  });
});


// Define your routes and application logic here
app.listen(port, () => {
	console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
