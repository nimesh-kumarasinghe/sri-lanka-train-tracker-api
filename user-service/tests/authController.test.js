const authController = require("../controllers/userController");
const authService = require("../services/authService");
const userModel = require("../models/userModel");
const encryptionUtils = require("../utils/encryptionUtils");

jest.mock("../services/authService");
jest.mock("../models/userModel");
jest.mock("../utils/encryptionUtils");

describe("Auth Controller", () => {
  // Test for register
  describe("register", () => {
    it("should register a new user successfully", async () => {
      const hashedPassword = "hashedPassword123";
      const newUser = {
        user_id: "test_user",
        password: hashedPassword,
        role: "user",
      };

      encryptionUtils.hashPassword.mockResolvedValue(hashedPassword);
      userModel.createUser.mockResolvedValue(newUser);

      const req = {
        body: { user_id: "test_user", password: "password123", role: "user" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.register(req, res);

      expect(encryptionUtils.hashPassword).toHaveBeenCalledWith("password123");
      expect(userModel.createUser).toHaveBeenCalledWith({
        user_id: "test_user",
        password: hashedPassword,
        role: "user",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User registered successfully",
        user: newUser,
      });
    });

    it("should return 500 if there is a server error during registration", async () => {
      encryptionUtils.hashPassword.mockRejectedValue(new Error("Server error"));

      const req = {
        body: { user_id: "test_user", password: "password123", role: "user" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        error: "Server error",
      });
    });
  });

  // Test for login
  describe("login", () => {
    it("should log in successfully with valid credentials", async () => {
      const user = {
        user_id: "test_user",
        password: "hashedPassword123",
        role: "user",
      };
      const token = "validToken123";

      userModel.getUserById.mockResolvedValue(user);
      encryptionUtils.comparePassword.mockResolvedValue(true);
      authService.generateToken.mockReturnValue(token);

      const req = { body: { user_id: "test_user", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.login(req, res);

      expect(userModel.getUserById).toHaveBeenCalledWith("test_user");
      expect(encryptionUtils.comparePassword).toHaveBeenCalledWith(
        "password123",
        "hashedPassword123"
      );
      expect(authService.generateToken).toHaveBeenCalledWith(
        "test_user",
        "user"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token, role: "user" });
    });

    it("should return 404 if user is not found", async () => {
      userModel.getUserById.mockResolvedValue(null);

      const req = { body: { user_id: "test_user", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.login(req, res);

      expect(userModel.getUserById).toHaveBeenCalledWith("test_user");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 401 if password does not match", async () => {
      const user = {
        user_id: "test_user",
        password: "hashedPassword123",
        role: "user",
      };

      userModel.getUserById.mockResolvedValue(user);
      encryptionUtils.comparePassword.mockResolvedValue(false);

      const req = { body: { user_id: "test_user", password: "wrongPassword" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.login(req, res);

      expect(userModel.getUserById).toHaveBeenCalledWith("test_user");
      expect(encryptionUtils.comparePassword).toHaveBeenCalledWith(
        "wrongPassword",
        "hashedPassword123"
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    it("should return 500 if there is a server error during login", async () => {
      userModel.getUserById.mockRejectedValue(new Error("Server error"));

      const req = { body: { user_id: "test_user", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        error: "Server error",
      });
    });
  });

  // Test for getUser
  describe("getUser", () => {
    it("should return user details if user exists", async () => {
      const user = { user_id: "test_user", role: "user" };

      authService.getUserById.mockResolvedValue(user);

      const req = { params: { id: "test_user" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.getUser(req, res);

      expect(authService.getUserById).toHaveBeenCalledWith("test_user");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should return 404 if user is not found", async () => {
      authService.getUserById.mockResolvedValue(null);

      const req = { params: { id: "test_user" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.getUser(req, res);

      expect(authService.getUserById).toHaveBeenCalledWith("test_user");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 500 if there is a server error during getting user", async () => {
      authService.getUserById.mockRejectedValue(new Error("Server error"));

      const req = { params: { id: "test_user" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
    });
  });

  // Test for updateUser
  describe("updateUser", () => {
    it("should update user details if user exists", async () => {
      const updatedUser = { user_id: "test_user", role: "admin" };

      authService.updateUser.mockResolvedValue(updatedUser);

      const req = { params: { id: "test_user" }, body: { role: "admin" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.updateUser(req, res);

      expect(authService.updateUser).toHaveBeenCalledWith("test_user", {
        role: "admin",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    it("should return 404 if user is not found", async () => {
      authService.updateUser.mockResolvedValue(null);

      const req = { params: { id: "test_user" }, body: { role: "admin" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.updateUser(req, res);

      expect(authService.updateUser).toHaveBeenCalledWith("test_user", {
        role: "admin",
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 500 if there is a server error during updating user", async () => {
      authService.updateUser.mockRejectedValue(new Error("Server error"));

      const req = { params: { id: "test_user" }, body: { role: "admin" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
    });
  });

  // Test for deleteUser
  describe("deleteUser", () => {
    it("should delete user if user exists", async () => {
      authService.deleteUser.mockResolvedValue(1);

      const req = { params: { id: "test_user" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.deleteUser(req, res);

      expect(authService.deleteUser).toHaveBeenCalledWith("test_user");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "User deleted" });
    });

    it("should return 404 if user is not found", async () => {
      authService.deleteUser.mockResolvedValue(0);

      const req = { params: { id: "test_user" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.deleteUser(req, res);

      expect(authService.deleteUser).toHaveBeenCalledWith("test_user");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 500 if there is a server error during deleting user", async () => {
      authService.deleteUser.mockRejectedValue(new Error("Server error"));

      const req = { params: { id: "test_user" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
    });
  });
});
