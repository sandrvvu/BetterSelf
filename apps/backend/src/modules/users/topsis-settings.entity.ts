import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity()
export class TopsisSettings {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("simple-array")
  criteria: string[];

  @Column("simple-array")
  isBenefit: boolean[];

  @Column("simple-array")
  weights: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}
