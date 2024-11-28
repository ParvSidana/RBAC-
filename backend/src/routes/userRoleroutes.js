import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  adminRole,
  moderatorRole,
  updateUserRole,
  userRole,
} from "../controllers/userRoles.controller.js";
import {
  verifyAdmin,
  verifyModerator,
} from "../middlewares/role.middleware.js";
const router = Router();

router.get("/admin", verifyJWT, verifyAdmin, adminRole);

router.get("/moderator", verifyJWT, verifyModerator, moderatorRole);
router.get("/user", verifyJWT, userRole);

// update user role by admin

router.patch("/update-role/", verifyJWT, verifyAdmin, updateUserRole);

export default router;
