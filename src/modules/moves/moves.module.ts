import { Module } from '@nestjs/common';
import { MovesService } from './services/moves.service';
import { MovesController } from './moves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Move } from './entities/move.entity';
import { Kill } from './entities/killMoves.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Move, Kill])],
  controllers: [MovesController],
  providers: [MovesService],
})
export class MovesModule {}
