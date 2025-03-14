import express, { Router } from "express";
import reservationController from "../../controllers/reservationController";
import authMiddleware from "../../middlewares/authMiddleware";
import authAdminMiddleware from "../../middlewares/authAdminMiddleware";

const router: Router = express.Router();

router.use(authMiddleware);

router.get("/my/", reservationController.getMyReservations); // Ruta sin middlewares

router.use(authAdminMiddleware);

router
  .post("/", reservationController.createReservation)
  .get("/", reservationController.getReservations)
  .get("/:id", reservationController.getOneReservation)
  .put("/:id", reservationController.updateReservation)
  .delete("/:id", reservationController.deleteReservation);

export default router;
