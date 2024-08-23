const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/users/:id", authMiddleware.verifyToken, userController.getUser);
router.put("/users/:id", authMiddleware.verifyToken, userController.updateUser);
router.delete(
  "/users/:id",
  authMiddleware.verifyToken,
  userController.deleteUser
);

module.exports = router;
