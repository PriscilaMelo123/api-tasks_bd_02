import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { tasksRoutes } from "./routes/tasks.routes";
import { userRoutes } from "./routes/user.routes";
import { DatabaseConnection } from "./database/config/connection";

const port = process.env.PORT || 3000;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/tasks", tasksRoutes);
// app.use("/:id/tasks", tasksRoutes);
app.use("/user", userRoutes);

DatabaseConnection.connect().then(() => {
  console.log("Database foi inicializada");
  app.listen(port, () => {
    console.log("API rodando na porta " + port);
  });
});
