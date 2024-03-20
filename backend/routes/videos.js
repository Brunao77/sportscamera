import { Router } from "express";
import { VideosController } from "../controllers/videos.js";
import { authenticateUser } from "../middlewares/auth.js";

export const createVideosRouter = ({ videosModel, userModel, cameraModel }) => {
  const router = Router();
  const videosController = new VideosController({
    videosModel,
    userModel,
    cameraModel,
  });
  router.get("/", authenticateUser, videosController.getAll);
  router.get("/:camera_id&:date", videosController.getVideoTurns);
  router.post("/", authenticateUser, videosController.create);
  router.delete("/:id", authenticateUser, videosController.delete);
  router.patch("/", authenticateUser, videosController.update);
  //router.post("/:establishment_id", videosController.getOne);

  return router;
};
