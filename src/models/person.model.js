const { v4: uuidv4 } = require('uuid');

let persons = require('../db/persons.json');

class Person {
  async findAll() {
    return persons;
  }

  async findById(id) {
    const person = persons.find(person => person.id === id);

    return person;
  }

  async create(person) {
    const newPerson = { id: uuidv4(), ...person};

    persons.push(newPerson);

    return newPerson;
  }

  async update(id, personData) {
    const index = persons.findIndex(person => person.id === id);
    const person = persons[index];
    
    persons[index] = {...person, ...personData};

    return persons[index];
  }

  async delete(id) {
    const index = persons.findIndex(person => person.id === id);
    const deletedPerson = persons[index];

    persons = persons.filter(person => person.id !== id);

    return deletedPerson;
  }
}

module.exports = new Person();
