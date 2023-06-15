import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const userRoutes = express.Router();

// Get user details
userRoutes.get("/:id", getUser);

// Update user information
userRoutes.put("/:id", updateUser);

// Delete a user
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
