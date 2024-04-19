import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createVideosRouter } from "./routes/videos.js";
import { VideosModel } from "./models/videos.js";
import { createUserRouter } from "./routes/user.js";
import { UserModel } from "./models/user.js";
import { createEstablishmentRouter } from "./routes/establishment.js";
import { EstablishmentModel } from "./models/establishment.js";
import { createCameraRouter } from "./routes/camera.js";
import { CameraModel } from "./models/camera.js";

const app = express();
const PORT = 3000;

const allowedOrigins = ["http://localhost:4321"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permite solicitudes que tienen un origen en la lista de origins permitidos
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Permite el uso de credenciales (cookies)
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(
  "/api/videos",
  createVideosRouter({
    videosModel: VideosModel,
    userModel: UserModel,
    cameraModel: CameraModel,
  })
);
app.use("/api/user", createUserRouter({ userModel: UserModel }));
app.use(
  "/api/establishment",
  createEstablishmentRouter({ establishmentModel: EstablishmentModel })
);
app.use("/api/camera", createCameraRouter({ cameraModel: CameraModel }));

app.listen(PORT, () => {
  console.log("server run");
});