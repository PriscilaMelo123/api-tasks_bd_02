import { Request, Response } from "express";
import { User } from "../models/user";
import { UserRepository } from "../database/repositories/user.repository";

export class UserController {
  public async list(req: Request, res: Response) {
    try {
      const repository = new UserRepository();
      const result = await repository.list();

      return res.status(200).send({
        ok: true,
        message: "User successfully listed",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repository = new UserRepository();
      const result = await repository.get(id);

      if (!result) {
        return res.status(404).send({
          ok: false,
          message: "O User não existe",
        });
      }

      const user = User.create(
        result.name,
        result.pass,
        result.id
        // result.skills?.split(",") ?? []
      );

      return res.status(200).send({
        ok: true,
        message: "User successfully obtained",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, pass } = req.body;

      if (!name) {
        return res.status(400).send({
          ok: false,
          message: "Name not provided",
        });
      }

      if (!pass) {
        return res.status(400).send({
          ok: false,
          message: "pass not provided",
        });
      }

      const user = new User(name, pass);

      const repository = new UserRepository();
      const result = await repository.create(user);

      return res.status(201).send({
        ok: true,
        message: "User successfully created",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, pass } = req.body;

      const repository = new UserRepository();
      const result = await repository.get(id);

      if (!result) {
        return res.status(404).send({
          ok: false,
          message: "User não encontrado",
        });
      }

      const resultUpdate = repository.update(result, {
        name,
        pass,
      });

      return res.status(200).send({
        ok: true,
        message: "User atualizado com sucesso",
        data: resultUpdate,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
