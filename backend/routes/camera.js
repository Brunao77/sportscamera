import { Router } from "express";
import { CameraController } from "../controllers/camera.js";

export const createCameraRouter = ({ cameraModel }) => {
  const router = Router();
  const cameraController = new CameraController({
    cameraModel,
  });
  router.get("/:establishment_id", cameraController.getAll);

  return router;
};
