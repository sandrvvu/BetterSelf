import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { IsEmail, IsNotEmpty } from "class-validator";
  import { Expose } from "class-transformer";
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn("uuid")
    @Expose()
    id: string;
  
    @Column({ unique: true })
    @IsEmail()
    @Expose()
    email: string;
  
    @Column()
    @IsNotEmpty()
    @Expose()
    name: string;
  
    @Column()
    @IsNotEmpty()
    password: string;
  
    @CreateDateColumn()
    @Expose()
    createdAt: Date;
  
    @UpdateDateColumn()
    @Expose()
    updatedAt: Date;
  }