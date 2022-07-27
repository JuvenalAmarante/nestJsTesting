import { Module } from '@nestjs/common';
import { PersonController } from './controllers/person.controller';
import { PersonRepository } from './repositories/person.repository';
import { PersonService } from './services/person.service';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonRepository],
})
export class PersonModule {}
