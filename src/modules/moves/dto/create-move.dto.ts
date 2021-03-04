import { IsOptional, IsPositive, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMoveDto {
  @ApiProperty({
    description: 'Move name',
    example: 'Rock',
    required: true,
  })
  @IsString()
  @Length(3, 20)
  name: string;

  @IsPositive({ each: true })
  @IsOptional()
  kills?: number[];
}
