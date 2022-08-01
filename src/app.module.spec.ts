import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let testModule: AppModule;

  beforeEach(async () => {
    /**
     * Cria um novo módulo para realizar os testes a partir do AppModule
     */
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    testModule = module.get<AppModule>(AppModule);
  });

  // Declaração de todos os testes para serem realizados
  it('Precisa estar definido', async () => {
    expect(testModule).toBeDefined();
  });
});
