import { IsNumber, IsString } from 'class-validator';

export class PersonDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  favoriteAnimal: string;
}
