const axios = require("axios");
const userController = require("../controllers/apiGatewayController");
const authService = require("../services/authService");
const encryptionUtils = require("../utils/encryptionUtils");
const { mockRequest, mockResponse } = require("jest-mock-req-res");

jest.mock("axios");
jest.mock("../services/authService");
jest.mock("../utils/encryptionUtils");

describe("User Controller", () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  describe("register", () => {
    it("should register a user successfully", async () => {
      const mockData = {
        user_id: "user123",
        password: "password",
        role: "admin",
      };
      req.body = mockData;

      const hashedPassword = "hashedPassword";
      encryptionUtils.hashPassword.mockResolvedValue(hashedPassword);
      axios.mockResolvedValue({ data: { success: true } });

      await userController.register(req, res);

      expect(encryptionUtils.hashPassword).toHaveBeenCalledWith(
        mockData.password
      );
      expect(axios).toHaveBeenCalledWith({
        url: expect.stringContaining("/users"),
        method: "POST",
        data: {
          user_id: mockData.user_id,
          password: hashedPassword,
          role: mockData.role,
        },
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it("should return an error if registration fails", async () => {
      req.body = { user_id: "user123", password: "password", role: "admin" };

      encryptionUtils.hashPassword.mockResolvedValue("hashedPassword");
      axios.mockRejectedValue({
        response: { data: { message: "Service Error" } },
      });

      await userController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Service Error" });
    });
  });

  describe("login", () => {
    it("should log in a user and return a token", async () => {
      req.body = { user_id: "user123", password: "password" };
      const mockData = { user_id: "user123", role: "admin" };
      axios.mockResolvedValue({ data: mockData });
      authService.generateToken.mockReturnValue("mockToken");

      await userController.login(req, res);

      expect(axios).toHaveBeenCalledWith({
        url: expect.stringContaining("/login"),
        method: "POST",
        data: req.body,
        headers: { "Content-Type": "application/json" },
      });
      expect(authService.generateToken).toHaveBeenCalledWith(
        mockData.user_id,
        mockData.role
      );
      expect(res.json).toHaveBeenCalledWith({ token: "mockToken" });
    });

    it("should return an error if login fails", async () => {
      req.body = { user_id: "user123", password: "password" };
      axios.mockRejectedValue({
        response: { data: { message: "Service Error" } },
      });

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Service Error" });
    });
  });

  describe("getUser", () => {
    it("should get a user by id", async () => {
      req.params.id = "user123";
      const mockData = { user_id: "user123", role: "admin" };
      axios.mockResolvedValue({ data: mockData });

      await userController.getUser(req, res);

      expect(axios).toHaveBeenCalledWith({
        url: expect.stringContaining(`/users/${req.params.id}`),
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("should return an error if getting user fails", async () => {
      req.params.id = "user123";
      axios.mockRejectedValue({
        response: { data: { message: "Service Error" } },
      });

      await userController.getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Service Error" });
    });
  });

  describe("updateUser", () => {
    it("should update a user by id", async () => {
      req.params.id = "user123";
      req.body = { role: "user" };
      const mockData = { success: true };
      axios.mockResolvedValue({ data: mockData });

      await userController.updateUser(req, res);

      expect(axios).toHaveBeenCalledWith({
        url: expect.stringContaining(`/users/${req.params.id}`),
        method: "PUT",
        data: req.body,
        headers: { "Content-Type": "application/json" },
      });
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("should return an error if updating user fails", async () => {
      req.params.id = "user123";
      req.body = { role: "user" };
      axios.mockRejectedValue({
        response: { data: { message: "Service Error" } },
      });

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Service Error" });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user by id", async () => {
      req.params.id = "user123";
      const mockData = { success: true };
      axios.mockResolvedValue({ data: mockData });

      await userController.deleteUser(req, res);

      expect(axios).toHaveBeenCalledWith({
        url: expect.stringContaining(`/users/${req.params.id}`),
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("should return an error if deleting user fails", async () => {
      req.params.id = "user123";
      axios.mockRejectedValue({
        response: { data: { message: "Service Error" } },
      });

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Service Error" });
    });
  });
});
