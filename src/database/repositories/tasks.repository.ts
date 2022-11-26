import { Tasks } from "../../models/tasks";
import { DatabaseConnection } from "../config/connection";
import { TasksEntity } from "../entities/tasks.entity";

interface UpdateTasksDTO {
  description?: string;
  detail?: string;
  arquivada?: boolean;
  id_user?: string;
}

export class TasksRepository {
  private _repository =
    DatabaseConnection.connection.getRepository(TasksEntity);

  public async list() {
    return await this._repository.find({
      relations: {
        user: true,
      },
    });
  }

  public async get(id: string) {
    return await this._repository.findOneBy({
      id,
    });
  }

  public async create(tasks: Tasks) {
    const tasksEntity = this._repository.create({
      id: tasks.id,
      description: tasks.description,
      detail: tasks.detail,
      id_user: tasks.user.id,
      // arquivada: tasks.arquivada,
    });

    return await this._repository.save(tasksEntity);
  }

  public async update(tasksEntity: TasksEntity, data: UpdateTasksDTO) {
    if (data.description) {
      tasksEntity.description = data.description;
    }

    if (data.detail) {
      tasksEntity.detail = data.detail;
    }

    if (data.id_user) {
      tasksEntity.id_user = data.id_user;
    }

    return await this._repository.save(tasksEntity);
  }

  public async arquivar(tasksEntity: TasksEntity, data: UpdateTasksDTO) {
    if (data.arquivada) {
      tasksEntity.arquivada = data.arquivada;
    }

    return await this._repository.save(tasksEntity);
  }

  public async delete(id: string) {
    return await this._repository.delete({ id });
  }
}
