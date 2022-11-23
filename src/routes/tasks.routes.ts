import { Router } from "express";
import { TasksController } from "../controllers/tasks.controller";

const tasksRoutes = Router();

tasksRoutes.get("/", new TasksController().list);
tasksRoutes.get("/:id", new TasksController().get);
tasksRoutes.post("/", new TasksController().create);
tasksRoutes.delete("/:id", new TasksController().delete);

export { tasksRoutes };
