import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PersonModule } from './Person/person.module';

const routes = [
  {
    path: 'persons',
    module: PersonModule,
  },
];

@Module({
  imports: [RouterModule.register(routes), PersonModule],
})
export class AppModule {}
