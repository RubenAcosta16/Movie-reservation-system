import express, { Router } from "express";

import userController from "../../controllers/userController";
import authMiddleware from "../../middlewares/authMiddleware";
import authAdminMiddleware from "../../middlewares/authAdminMiddleware";

const router: Router = express.Router();

router
  .post("/register", userController.register)
  .post("/login", userController.login)
  .post("/logout", userController.logout)
  .get("/protected", authMiddleware, userController.protectedRoute)
  .post(
    "/changerole",
    authMiddleware,
    authAdminMiddleware,
    userController.changeRole
  );

export default router;
