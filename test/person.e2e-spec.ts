import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PersonDTO } from 'src/Person/dto/person.dto';

describe('PersonController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/persons - GET', async () => {
    const response = await request(app.getHttpServer()).get('/persons');

    expect(response.status).toBe(200);

    response.body.forEach((pessoa: PersonDTO) => {
      expect(pessoa).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        age: expect.any(Number),
        favoriteAnimal: expect.any(String),
      });
    });
  });

  it('/persons/1 - GET', async () => {
    const response = await request(app.getHttpServer()).get('/persons/1');

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      age: expect.any(Number),
      favoriteAnimal: expect.any(String),
    });
  });

  it('/persons - POST', async () => {
    const dto = { name: 'Irineu Campos', age: 37, favoriteAnimal: 'Vaca' };

    const response = await request(app.getHttpServer())
      .post('/persons')
      .send(dto);

    expect(response.status).toBe(201);

    expect(response.body).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      age: expect.any(Number),
      favoriteAnimal: expect.any(String),
    });
  });

  it('/persons/1 - PATCH', async () => {
    const dto = { name: 'Irineu Campos', age: 37, favoriteAnimal: 'Vaca' };

    const response = await request(app.getHttpServer())
      .patch('/persons/1')
      .send(dto);

    expect(response.status).toBe(204);
  });

  it('/persons/1 - DELETE', async () => {
    const response = await request(app.getHttpServer()).delete('/persons/1');

    expect(response.status).toBe(204);
  });
});
