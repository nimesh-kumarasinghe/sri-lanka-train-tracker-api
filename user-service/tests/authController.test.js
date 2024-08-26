const authService = require("../services/authService");
const userModel = require("../models/userModel");
const encryptionUtils = require("../utils/encryptionUtils");
const userController = require("../controllers/userController");

jest.mock("../services/authService");
jest.mock("../models/userModel");
jest.mock("../utils/encryptionUtils");

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register a user successfully", async () => {
      const req = {
        body: {
          user_id: "testuser",
          password: "password123",
          role: "user",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      userModel.createUser.mockResolvedValue(req.body);

      await userController.register(req, res);

      expect(userModel.createUser).toHaveBeenCalledWith({
        user_id: "testuser",
        password: "password123",
        role: "user",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User registered successfully",
        user: req.body,
      });
    });

    it("should return 500 if there is an error", async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      userModel.createUser.mockRejectedValue(new Error("Test Error"));

      await userController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        error: "Test Error",
      });
    });
  });

  describe("login", () => {
    it("should return a token and role if login is successful", async () => {
      const req = {
        body: {
          user_id: "testuser",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const user = {
        user_id: "testuser",
        password: "hashedpassword",
        role: "user",
      };
      userModel.getUserById.mockResolvedValue(user);
      encryptionUtils.comparePassword.mockResolvedValue(true);
      authService.generateToken.mockReturnValue("testtoken");

      await userController.login(req, res);

      expect(userModel.getUserById).toHaveBeenCalledWith("testuser");
      expect(encryptionUtils.comparePassword).toHaveBeenCalledWith(
        "password123",
        "hashedpassword"
      );
      expect(authService.generateToken).toHaveBeenCalledWith(
        "testuser",
        "user"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        token: "testtoken",
        role: "user",
      });
    });

    it("should return 404 if user is not found", async () => {
      const req = { body: { user_id: "unknown", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      userModel.getUserById.mockResolvedValue(null);

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 401 if password does not match", async () => {
      const req = { body: { user_id: "testuser", password: "wrongpassword" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const user = {
        user_id: "testuser",
        password: "hashedpassword",
        role: "user",
      };
      userModel.getUserById.mockResolvedValue(user);
      encryptionUtils.comparePassword.mockResolvedValue(false);

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    it("should return 500 if there is an error", async () => {
      const req = { body: { user_id: "testuser", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      userModel.getUserById.mockRejectedValue(new Error("Test Error"));

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        error: "Test Error",
      });
    });
  });

  describe("getUser", () => {
    it("should return a user if found", async () => {
      const req = { params: { id: "testuser" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const user = { user_id: "testuser", role: "user" };
      authService.getUserById.mockResolvedValue(user);

      await userController.getUser(req, res);

      expect(authService.getUserById).toHaveBeenCalledWith("testuser");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should return 404 if user is not found", async () => {
      const req = { params: { id: "unknown" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      authService.getUserById.mockResolvedValue(null);

      await userController.getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 500 if there is an error", async () => {
      const req = { params: { id: "testuser" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      authService.getUserById.mockRejectedValue(new Error("Test Error"));

      await userController.getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
      });
    });
  });

  describe("updateUser", () => {
    it("should update a user if found", async () => {
      const req = {
        params: { id: "testuser" },
        body: { role: "admin" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const updatedUser = { user_id: "testuser", role: "admin" };
      authService.updateUser.mockResolvedValue(updatedUser);

      await userController.updateUser(req, res);

      expect(authService.updateUser).toHaveBeenCalledWith("testuser", {
        role: "admin",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    it("should return 404 if user is not found", async () => {
      const req = { params: { id: "unknown" }, body: { role: "admin" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      authService.updateUser.mockResolvedValue(null);

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 500 if there is an error", async () => {
      const req = {
        params: { id: "testuser" },
        body: { role: "admin" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      authService.updateUser.mockRejectedValue(new Error("Test Error"));

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
      });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user if found", async () => {
      const req = { params: { id: "testuser" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      authService.deleteUser.mockResolvedValue(1);

      await userController.deleteUser(req, res);

      expect(authService.deleteUser).toHaveBeenCalledWith("testuser");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "User deleted" });
    });

    it("should return 404 if user is not found", async () => {
      const req = { params: { id: "unknown" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      authService.deleteUser.mockResolvedValue(0);

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 500 if there is an error", async () => {
      const req = { params: { id: "testuser" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      authService.deleteUser.mockRejectedValue(new Error("Test Error"));

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
      });
    });
  });
});
