import { Injectable } from '@nestjs/common';
import { NewPersonDTO } from '../dto/new-person.dto';
import { PersonDTO } from '../dto/person.dto';

@Injectable()
export class PersonRepository {
  private person: PersonDTO[];

  constructor() {
    this.person = [
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
    ];
  }

  async findAll(): Promise<PersonDTO[]> {
    return new Promise((resolve) => resolve(this.person));
  }

  async findOne(id: number): Promise<PersonDTO | undefined> {
    return new Promise((resolve) =>
      resolve(this.person.find((person) => person.id == id)),
    );
  }

  async store(person: NewPersonDTO): Promise<PersonDTO | null> {
    return new Promise((resolve) => {
      try {
        const newPerson = {
          id: this.person[this.person.length - 1].id + 1,
          ...person,
        };

        this.person.push(newPerson);

        resolve(newPerson);
      } catch (err) {
        return resolve(null);
      }
    });
  }

  async delete(id: number): Promise<PersonDTO[]> {
    return new Promise((resolve) => {
      this.person = this.person.filter((person) => person.id != id);

      resolve(this.person);
    });
  }

  async update(
    id: number,
    personData: NewPersonDTO,
  ): Promise<PersonDTO | null> {
    return new Promise((resolve) => {
      try {
        const newPerson: PersonDTO = {
          id: id,
          ...personData,
        };

        this.person = this.person.map((person) => {
          if (person.id == id) return newPerson;

          return person;
        });

        resolve(newPerson);
      } catch (err) {
        return resolve(null);
      }
    });
  }
}
