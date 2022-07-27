import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class NewPersonDTO {
  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  age: number;

  @IsString()
  @ApiProperty()
  favoriteAnimal: string;
}
