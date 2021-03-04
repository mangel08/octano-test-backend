import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({
    description: 'Player Name',
    example: 'Scorpion',
    required: true,
  })
  @IsString()
  name: string;
}
