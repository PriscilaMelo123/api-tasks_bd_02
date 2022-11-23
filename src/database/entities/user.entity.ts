import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { TasksEntity } from "./tasks.entity";

@Entity({
  name: "users",
})
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  pass!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt!: Date;

  @OneToMany(() => TasksEntity, (tasks) => tasks.user)
  tasks!: TasksEntity[];
}
