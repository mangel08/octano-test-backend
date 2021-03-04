import { Controller, Get, Post, Body, Put, Param, Delete, Patch, BadRequestException } from '@nestjs/common';
import { MovesService } from './services/moves.service';
import { CreateMoveDto } from './dto/create-move.dto';
import { UpdateMoveDto } from './dto/update-move.dto';
import { Kill } from './entities/killMoves.entity';

@Controller('moves')
export class MovesController {
  constructor(private readonly movesService: MovesService) {}

  @Post()
  create(@Body() createMoveDto: CreateMoveDto) {
    return this.movesService.create(createMoveDto);
  }

  @Get()
  findAll() {
    return this.movesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoveDto: UpdateMoveDto) {
    return this.movesService.update(+id, updateMoveDto);
  }

  @Get(':id/kills')
  async getKillByMoves(@Param('id') id: string): Promise<Kill[]> {
    try {
      return await this.movesService.findMoveKiller(+id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
