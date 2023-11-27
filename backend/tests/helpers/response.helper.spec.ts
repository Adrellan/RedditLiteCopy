import { Response } from "express";
import { badRequest, Ok, ClientError, Unauthorized, Forbidden } from "../../src/helpers/response.helper";

describe("Response Helper Functions", () => {
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it("should set status to 500 and send the provided parameters for badRequest", () => {
    badRequest(mockResponse as Response, "Bad Request");
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith("Bad Request");
  });

  it("should set status to 200 and send the provided parameters for Ok", () => {
    Ok(mockResponse as Response, "Success");
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith("Success");
  });

  it("should set status to 400 and send the provided parameters for ClientError", () => {
    ClientError(mockResponse as Response, "Client Error");
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith("Client Error");
  });

  it("should set status to 401 and send the provided parameters for Unauthorized", () => {
    Unauthorized(mockResponse as Response, "Unauthorized");
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalledWith("Unauthorized");
  });

  it("should set status to 403 and send the provided parameters for Forbidden", () => {
    Forbidden(mockResponse as Response, "Forbidden");
    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.send).toHaveBeenCalledWith("Forbidden");
  });
});
