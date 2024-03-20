import { Router } from "express";
import { EstablishmentController } from "../controllers/establishment.js";

export const createEstablishmentRouter = ({ establishmentModel }) => {
  const router = Router();
  const establishmentController = new EstablishmentController({
    establishmentModel,
  });
  router.get("/", establishmentController.getAll);
  router.get("/:establishment_id", establishmentController.getOne);

  return router;
};
