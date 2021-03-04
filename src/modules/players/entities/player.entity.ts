import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('player')
export class Player {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false, unique: true })
  name: string;
}
