import express, { Router } from "express";
import movieController from "../../controllers/movieController";
import authMiddleware from "../../middlewares/authMiddleware";
import authAdminMiddleware from "../../middlewares/authAdminMiddleware";
import deleteImageMiddleware from "../../middlewares/image/deleteImageMiddleware";
import imageUseMiddleware from "../../middlewares/image/imageUseMiddleware";
import uploadImageMiddleware from "../../middlewares/image/uploadImageMiddleware";

const router: Router = express.Router();

// Definir una ruta pública que no tenga middlewares
router
  .get("/", movieController.getMovies)
  .get("/:id", movieController.getOneMovie);

// Aplicar middlewares a todas las rutas restantes
router.use(authMiddleware);
router.use(authAdminMiddleware);

// Definir las rutas protegidas
router
  .post(
    "/",
    imageUseMiddleware,
    uploadImageMiddleware,
    movieController.createMovie
  )
  .put(
    "/:id",
    imageUseMiddleware,
    deleteImageMiddleware,
    uploadImageMiddleware,
    movieController.updateMovie
  )
  .delete("/:id", movieController.deleteMovie);

export default router;
