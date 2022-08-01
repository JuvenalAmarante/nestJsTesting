import { Test, TestingModule } from '@nestjs/testing';
import { PersonModule } from './person.module';

describe('PersonModule', () => {
  let testModule: PersonModule;

  beforeEach(async () => {
    /**
     * Cria um novo módulo para realizar os testes a partir do PersonModule
     */
    const module: TestingModule = await Test.createTestingModule({
      imports: [PersonModule],
    }).compile();

    testModule = module.get<PersonModule>(PersonModule);
  });

  // Declaração de todos os testes para serem realizados
  it('Precisa estar definido', async () => {
    expect(testModule).toBeDefined();
  });
});
