import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Kill } from './killMoves.entity';

@Entity('move')
export class Move {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(
    () => Kill,
    kills => kills.moveId,
  )
  kills: Kill[];

  constructor(name: string) {
    this.name = name;
  }
}
