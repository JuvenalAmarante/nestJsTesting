import { Test, TestingModule } from '@nestjs/testing';
import { PersonDTO } from '../dto/person.dto';
import { PersonRepository } from '../repositories/person.repository';
import { PersonService } from '../services/person.service';

describe('PersonService', () => {
  let service: PersonService;

  // Adicionando um novo Mock para substituir o PersonRepository
  const mockPersonRepository = {
    findAll: jest.fn((): PersonDTO[] => [
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
    findOne: jest.fn((id): PersonDTO | null => {
      if ([1, 2].includes(id))
        return {
          id: id,
          name: 'Juliano Castro',
          favoriteAnimal: 'Cachorro',
          age: 25,
        };
      else return null;
    }),
    store: jest.fn((person) => {
      if (person.age !== 999) return { id: 1, ...person };
      else null;
    }),
    update: jest.fn((id, person) => {
      if (id === 1) return { id, ...person };
      else return null;
    }),
    delete: jest.fn((id) => id && null),
  };

  beforeEach(async () => {
    /**
     * Cria um novo módulo para realizar os testes, substituindo o PersonService pelo Mock
     * criado acima, utilizando uma forma diferente da apresentada no PersonController
     */
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: PersonRepository,
          useValue: mockPersonRepository,
        },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
  });

  // Declaração de todos os testes para serem realizados
  it('Precisa estar definido', async () => {
    expect(service).toBeDefined();
  });

  it('Precisa retornar uma lista de pessoas', async () => {
    const pessoas = await service.getAll();

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
    expect(await service.getOne(1)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      age: expect.any(Number),
      favoriteAnimal: expect.any(String),
    });
  });

  it('Precisa retornar um erro caso não encontre os dados de uma pessoa', async () => {
    await expect(service.getOne(15)).rejects.toHaveProperty(
      'message',
      'User not found',
    );
  });

  it('Precisa criar uma nova pessoa', async () => {
    const dto = { name: 'Irineu Campos', age: 37, favoriteAnimal: 'Vaca' };

    expect(await service.store(dto)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      age: expect.any(Number),
      favoriteAnimal: expect.any(String),
    });
  });

  it('Precisa retornar um erro caso não consiga salvar os dados da pessoa', async () => {
    const dto = { name: 'Irineu Campos', age: 999, favoriteAnimal: 'Vaca' };

    await expect(service.store(dto)).rejects.toHaveProperty(
      'message',
      "Couldn't store user",
    );
  });

  it('Precisa atualizar os dados de uma pessoa', async () => {
    const dto = { name: 'Irineu Campos', age: 37, favoriteAnimal: 'Vaca' };

    expect(await service.updateOne(1, dto)).toBeNull();
  });

  it('Precisa retornar um erro caso não consiga encontrar os dados da pessoa para atualizar', async () => {
    const dto = { name: 'Irineu Campos', age: 37, favoriteAnimal: 'Vaca' };

    await expect(service.updateOne(15, dto)).rejects.toHaveProperty(
      'message',
      'User not found',
    );
  });

  it('Precisa retornar um erro caso não consiga atualizar os dados da pessoa', async () => {
    const dto = { name: 'Irineu Campos', age: 37, favoriteAnimal: 'Vaca' };

    await expect(service.updateOne(2, dto)).rejects.toHaveProperty(
      'message',
      "Couldn't update user",
    );
  });

  it('Precisa deletar os dados de uma pessoa', async () => {
    expect(await service.deleteOne(1)).toBeNull();
  });

  it('Precisa retornar um erro caso não consiga encontrar os dados da pessoa para deletar', async () => {
    await expect(service.deleteOne(15)).rejects.toHaveProperty(
      'message',
      'User not found',
    );
  });
});
