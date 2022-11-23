import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", new UserController().list);
userRoutes.get("/:id", new UserController().get);
userRoutes.post("/", new UserController().create);
userRoutes.put("/:id", new UserController().update);

export { userRoutes };
