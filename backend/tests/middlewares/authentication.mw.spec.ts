import { Request, Response, NextFunction } from 'express';
import { authenticationMiddleware } from '../../src/middlewares/authentication.mw'; // Adjust the path accordingly
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('Authentication Middleware', () => {
  let mockRequest: Partial<Request> & { user?: { username: string } };
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      cookies: {
        AUTH_TOKEN: 'mockAuthToken',
        AUTH_SIGNATURE: 'mockAuthSignature',
      },
    };

    mockResponse = {
      sendStatus: jest.fn(),
    };

    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 401 if authToken or authSignature is missing', () => {
    mockRequest.cookies = {};

    authenticationMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should verify the JWT and call next if successful', () => {
    const decodedMock = { username: 'testUser' };
    (jwt.verify as jest.Mock).mockReturnValue(decodedMock);

    authenticationMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(jwt.verify).toHaveBeenCalledWith(
      'mockAuthToken.mockAuthSignature',
      process.env.JWT_SECRET_KEY
    );
    expect(mockRequest.user).toEqual(decodedMock);
    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.sendStatus).not.toHaveBeenCalled();
  });

  it('should return 403 if JWT verification fails', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('JWT verification failed');
    });

    authenticationMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(403);
    expect(mockNext).not.toHaveBeenCalled();
  });
});
