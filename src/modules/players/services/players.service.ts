import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Player } from '../entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    try {
      return await this.playerRepository.save(createPlayerDto);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.playerRepository.find();
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: number) {
    try {
      const player = await this.playerRepository.find({ id: id });
      if (!player) throw new NotFoundException();
      return player;
    } catch (error) {
      console.log(error);
    }
  }
}
