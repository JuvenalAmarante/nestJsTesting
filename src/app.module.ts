import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AnimalModule } from './Animal/animal.module';
import { PersonModule } from './Person/person.module';

const routes = [
  {
    path: 'persons',
    module: PersonModule,
  },
  {
    path: 'animals',
    module: AnimalModule,
  },
];

@Module({
  imports: [RouterModule.register(routes), PersonModule, AnimalModule],
})
export class AppModule {}
