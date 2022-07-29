import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NewPersonDTO } from '../dto/new-person.dto';
import { PersonDTO } from '../dto/person.dto';
import { PersonService } from '../services/person.service';

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  async listAll(): Promise<PersonDTO[]> {
    return this.personService.getAll();
  }

  @Get(':id')
  async listOne(@Param('id') id: number): Promise<PersonDTO | null> {
    return this.personService.getOne(id);
  }

  @Post()
  @HttpCode(201)
  async store(@Body() person: NewPersonDTO): Promise<PersonDTO | null> {
    return this.personService.store(person);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id') id: number): Promise<PersonDTO | null> {
    return this.personService.deleteOne(id);
  }

  @Patch(':id')
  @HttpCode(204)
  async updateOne(
    @Param('id') id: number,
    @Body() personData: NewPersonDTO,
  ): Promise<PersonDTO | null> {
    return this.personService.updateOne(id, personData);
  }
}
