import { Test, TestingModule } from '@nestjs/testing';
import { PersonDTO } from '../dto/person.dto';
import { PersonService } from '../services/person.service';
import { PersonController } from './person.controller';

describe('PersonController', () => {
  let controller: PersonController;

  // Adicionando um novo Mock para substituir o PersonService
  const mockPersonService = {
    getAll: jest.fn((): PersonDTO[] => [
      {
        id: 1,
        name: 'Juliano Castro',
        favoriteAnimal: 'Cachorro',
        age: 25,
      },
      {
        id: 2,
        name: 'Amélia Cruz',
        favoriteAnimal: 'Gato',
        age: 21,
      },
    ]),
    getOne: jest.fn(
      (id): PersonDTO => ({
        id: id,
        name: 'Juliano Castro',
        favoriteAnimal: 'Cachorro',
        age: 25,
      }),
    ),
    store: jest.fn((person) => ({ id: 1, ...person })),
    updateOne: jest.fn((id, person) => id && person && null),
    deleteOne: jest.fn((id) => id && null),
  };

  beforeEach(async () => {
    // Cria um novo módulo para realizar os testes, substituindo o PersonService pelo Mock Criado acima
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [PersonService],
    })
      .overrideProvider(PersonService)
      .useValue(mockPersonService)
      .compile();

    controller = module.get<PersonController>(PersonController);
  });

  // Declaração de todos os testes para serem realizados
  it('Precisa estar definido', async () => {
    expect(controller).toBeDefined();
  });

  it('Precisa retornar uma lista de pessoas', async () => {
    const pessoas = await controller.listAll();

    pessoas.forEach((pessoa) => {
      expect(pessoa).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        age: expect.any(Number),
        favoriteAnimal: expect.any(String),
      });
    });
  });

  it('Precisa retornar os dados de uma pessoa', async () => {
    expect(await controller.listOne(1)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      age: expect.any(Number),
      favoriteAnimal: expect.any(String),
    });
  });

  it('Precisa criar uma nova pessoa', async () => {
    const dto = { name: 'Irineu Campos', age: 37, favoriteAnimal: 'Vaca' };

    expect(await controller.store(dto)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      age: expect.any(Number),
      favoriteAnimal: expect.any(String),
    });
  });

  it('Precisa atualizar os dados de uma pessoa', async () => {
    const dto = { name: 'Irineu Campos', age: 37, favoriteAnimal: 'Vaca' };

    expect(await controller.updateOne(1, dto)).toBeNull();
  });

  it('Precisa deletar os dados de uma pessoa', async () => {
    expect(await controller.deleteOne(1)).toBeNull();
  });
});
