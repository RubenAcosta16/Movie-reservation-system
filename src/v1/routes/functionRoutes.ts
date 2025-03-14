import express, { Router } from "express";

import functionController from "../../controllers/functionController";
import authMiddleware from "../../middlewares/authMiddleware";
import authAdminMiddleware from "../../middlewares/authAdminMiddleware";

const router: Router = express.Router();

router
  .get("/", functionController.getFunctions)
  .get("/:id", functionController.getOneFunction);

router.use(authMiddleware);
router.use(authAdminMiddleware);

router
  .post(
    "/",
    authMiddleware,
    authAdminMiddleware,
    functionController.createFunction
  )
  .put(
    "/:id",

    functionController.updateFunction
  )
  .delete(
    "/:id",

    functionController.deleteFunction
  );

export default router;
