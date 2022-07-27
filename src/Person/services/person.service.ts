import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NewPersonDTO } from '../dto/new-person.dto';
import { PersonDTO } from '../dto/person.dto';
import { PersonRepository } from '../repositories/person.repository';

@Injectable()
export class PersonService {
  constructor(private readonly personRepository: PersonRepository) {}

  async getAll(): Promise<PersonDTO[]> {
    return this.personRepository.findAll();
  }

  async getOne(id: number): Promise<PersonDTO | null> {
    const person = await this.personRepository.findOne(id);

    if (!person)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return person;
  }

  async store(person: NewPersonDTO): Promise<PersonDTO | null> {
    const newPerson = await this.personRepository.store(person);

    if (!newPerson)
      throw new HttpException(
        "Couldn't store user",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return newPerson;
  }

  async deleteOne(id: number): Promise<PersonDTO | null> {
    const person = await this.personRepository.findOne(id);

    if (!person)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    await this.personRepository.delete(id);

    return null;
  }

  async updadeOne(
    id: number,
    personData: NewPersonDTO,
  ): Promise<PersonDTO | null> {
    const person = await this.personRepository.findOne(id);

    if (!person)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const updatePerson = await this.personRepository.update(id, personData);

    if (!updatePerson)
      throw new HttpException(
        "Couldn't update user",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return null;
  }
}
