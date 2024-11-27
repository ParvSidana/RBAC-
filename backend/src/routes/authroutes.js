import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);

export default router;
