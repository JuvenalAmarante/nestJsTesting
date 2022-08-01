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
import { ApiNoContentResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewPersonDTO } from '../dto/new-person.dto';
import { PersonDTO } from '../dto/person.dto';
import { PersonService } from '../services/person.service';

@ApiTags('Rota de pessoas')
@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'A lista de pessoas foi carregada com sucesso',
    type: PersonDTO,
    isArray: true,
  })
  async listAll(): Promise<PersonDTO[]> {
    return this.personService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Os dados da pessoa foi carregado com sucesso',
    type: PersonDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Os dados da pessoa não foram encontrados',
  })
  async listOne(@Param('id') id: number): Promise<PersonDTO> {
    return this.personService.getOne(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'A pessoa foi cadastrada com sucesso',
  })
  @ApiResponse({
    status: 500,
    description: 'Não foi possível salvar os dados da pessoa',
  })
  async store(@Body() person: NewPersonDTO): Promise<PersonDTO> {
    return this.personService.store(person);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Os dados da pessoa foram removidos com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Os dados da pessoa não foram encontrados',
  })
  async deleteOne(@Param('id') id: number): Promise<null> {
    return this.personService.deleteOne(id);
  }

  @Patch(':id')
  @HttpCode(204)
  @ApiNoContentResponse({
    status: 204,
    description: 'Os dados da pessoa foram atualizados com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Os dados da pessoa não foram encontrados',
  })
  @ApiResponse({
    status: 500,
    description: 'Não foi possível atualizar os dados da pessoa',
  })
  async updateOne(
    @Param('id') id: number,
    @Body() personData: NewPersonDTO,
  ): Promise<null> {
    return this.personService.updateOne(id, personData);
  }
}
