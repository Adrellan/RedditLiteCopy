import { performanceMiddleware } from '../../src/middlewares/performace.mw'; // Adjust the path accordingly
import { Request, Response } from 'express';

describe('Performance Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      method: 'GET',
      url: '/example',
    };

    mockResponse = {
      locals: {},
    };

    mockNext = jest.fn();
  });

  it('should log API request start and end times', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    performanceMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('GET /example')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('API request started')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('API request ended')
    );

    // Assert other expectations as needed
  });

  it('should call next function', () => {
    performanceMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).toHaveBeenCalled();
  });
});
