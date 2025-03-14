import express, { Router } from "express";
import theaterController from "../../controllers/theaterController";
import authMiddleware from "../../middlewares/authMiddleware";
import authAdminMiddleware from "../../middlewares/authAdminMiddleware";

const router: Router = express.Router();

router.use(authMiddleware);
router.use(authAdminMiddleware);

router
  .post("/", theaterController.createTheater)
  .get("/", theaterController.getTheaters)
  .get("/:id", theaterController.getOneTheater)
  .put("/:id", theaterController.updateTheater)
  .delete("/:id", theaterController.deleteTheater);

export default router;
