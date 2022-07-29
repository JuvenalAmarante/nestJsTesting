import { Test, TestingModule } from '@nestjs/testing';
import { PersonRepository } from '../repositories/person.repository';

describe('PersonRepository', () => {
  let repository: PersonRepository;

  beforeEach(async () => {
    /**
     * Cria um novo módulo para realizar os testes, substituindo o PersonRepository pelo Mock
     * criado acima, utilizando uma forma diferente da apresentada no PersonController
     */
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonRepository],
    }).compile();

    repository = module.get<PersonRepository>(PersonRepository);
  });

  // Declaração de todos os testes para serem realizados
  it('Precisa estar definido', async () => {
    expect(repository).toBeDefined();
  });

  it('Precisa retornar uma lista de pessoas', async () => {
    const pessoas = await repository.findAll();

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
    expect(await repository.findOne(1)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      age: expect.any(Number),
      favoriteAnimal: expect.any(String),
    });
  });

  it('Precisa criar uma nova pessoa', async () => {
    const dto = { name: 'Irineu Campos', age: 37, favoriteAnimal: 'Vaca' };

    expect(await repository.store(dto)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      age: expect.any(Number),
      favoriteAnimal: expect.any(String),
    });
  });

  it('Precisa atualizar os dados de uma pessoa', async () => {
    const dto = { name: 'Irineu Campos', age: 37, favoriteAnimal: 'Vaca' };

    expect(await repository.update(1, dto)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      age: expect.any(Number),
      favoriteAnimal: expect.any(String),
    });
  });

  it('Precisa deletar os dados de uma pessoa', async () => {
    const pessoas = await repository.delete(1);

    pessoas.forEach((pessoa) => {
      expect(pessoa).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        age: expect.any(Number),
        favoriteAnimal: expect.any(String),
      });
    });
  });
});
