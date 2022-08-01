import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PersonDTO {
  @IsNumber()
  @ApiProperty({ description: `O código identificadorda pessoa`, example: 1 })
  id: number;

  @IsString()
  @ApiProperty({
    description: `O nome completo da pessoa`,
    example: 'Irineu Campos',
  })
  name: string;

  @IsNumber()
  @ApiProperty({ description: `A idade da pessoa`, example: 37 })
  age: number;

  @IsString()
  @ApiProperty({
    description: `O animal favorito da pessoa`,
    example: 'Porco-espinho',
  })
  favoriteAnimal: string;
}
