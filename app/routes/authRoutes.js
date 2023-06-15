import { Router } from "express";
import validationMiddleware from "../../middleware/validationMiddleware.js";
import {
  validationLoginChains,
  validationRegisterChains,
} from "../../middleware/validationChains.js";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
const authRoutes = Router();
// Register a new user
authRoutes.post(
  "/register",
  validationMiddleware(validationRegisterChains),
  registerUser
);
// User login
authRoutes.post(
  "/login",
  validationMiddleware(validationLoginChains),
  loginUser
);
// User logout
authRoutes.get("/logout", logoutUser);
export default authRoutes;
