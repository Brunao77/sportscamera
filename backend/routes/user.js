import { Router } from "express";
import { UserController } from "../controllers/user.js";
import { authenticateUser } from "../middlewares/auth.js";

export const createUserRouter = ({ userModel }) => {
  const router = Router();
  const userController = new UserController({ userModel });
  router.post("/login", userController.login);
  router.post("/signup", userController.signup);
  router.get("/profile", authenticateUser, userController.profile);

  return router;
};
