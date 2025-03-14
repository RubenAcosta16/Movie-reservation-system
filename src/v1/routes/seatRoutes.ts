import express, { Router } from "express";
import seatController from "../../controllers/seatController";
import authMiddleware from "../../middlewares/authMiddleware";
import authAdminMiddleware from "../../middlewares/authAdminMiddleware";

const router: Router = express.Router();

router.use(authMiddleware);
router.use(authAdminMiddleware);

router
  .post("/", seatController.createSeat)
  .get("/", seatController.getSeats)
  .get("/:id", seatController.getOneSeat)
  .put("/:id", seatController.updateSeat)
  .delete("/:id", seatController.deleteSeat);

export default router;
