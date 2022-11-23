import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({
  name: "tasks",
})
export class TasksEntity {
  @PrimaryColumn()
  id!: string;

  @Column({
    length: 60,
  })
  description!: string;

  @Column({
    length: 60,
  })
  detail!: string;

  @Column({
    insert: false,
  })
  arquivada!: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "id_user",
  })
  user!: UserEntity;

  @Column({
    name: "id_user",
  })
  id_user!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt!: Date;
}
