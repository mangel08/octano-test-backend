import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMoveDto } from '../dto/create-move.dto';
import { UpdateMoveDto } from '../dto/update-move.dto';
import { Move } from '../entities/move.entity';
import { Kill } from '../entities/killMoves.entity';

@Injectable()
export class MovesService {
  constructor(
    @InjectRepository(Move)
    private moveRepository: Repository<Move>,
    @InjectRepository(Kill)
    private killMoves: Repository<Kill>,
  ) {}
  async create(createMoveDto: CreateMoveDto) {
    try {
      const move: Move = new Move(createMoveDto.name);
      const createdMove = await this.moveRepository.save(move);
      if (createMoveDto.kills.length > 0) {
        const kills: Kill[] = createMoveDto.kills.map(item => {
          return new Kill(createdMove.id, item);
        });
        await this.killMoves.save(kills);
      }
      return createdMove;
    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    try {
      return await this.moveRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      const move = await this.moveRepository.find({ id });
      if (!move) throw new NotFoundException();
      return move;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateMoveDto: UpdateMoveDto) {
    try {
      const move = await this.moveRepository.preload({
        id: id,
        name: updateMoveDto.name,
      });
      if (!move) {
        throw new NotFoundException();
      }
      return await this.moveRepository.save(move);
    } catch (error) {
      console.log(error);
    }
  }

  async findMoveKiller(moveId: number): Promise<Kill[]> {
    try {
      const killMoves = await this.killMoves.find({
        where: { moveId: moveId },
        relations: ['move'],
      });
      return killMoves;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
