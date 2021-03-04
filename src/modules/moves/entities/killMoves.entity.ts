import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Move } from './move.entity';

@Entity('kill')
export class Kill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  moveId: number;

  @Column({ nullable: false })
  moveKilledId: number;

  @ManyToOne(
    () => Move,
    move => move.kills,
  )
  move: Move;

  @ManyToOne(
    () => Move,
    move => move.kills,
  )
  moveKilled: Move;

  constructor(moveId: number, moveKilled: number) {
    this.moveId = moveId;
    this.moveKilledId = moveKilled;
  }
}
