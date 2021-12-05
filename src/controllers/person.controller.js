const Person = require('../models/person.model');
const { parseBodyData, isUuid } = require('../utils/helpers');

class PersonController {
  /**
   * @desc Returns all persons 
   * @route GET /person
   */
  async getPersons(req, res) {
    try {
      const persons = await Person.findAll();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(persons));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: '500 Internal Server Error' }));
    }
  }

  /**
   * @desc Returns one person by id
   * @route GET /person/:id
   */
  async getPerson(req, res) {
    try {
      const { id } = req.params;

      if (!isUuid(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Person ID must be in uuid format' }));
      }

      const person = await Person.findById(id);

      if (!person) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Person with id ${id} not found` }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(person));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: '500 Internal Server Error' }));
    }
  }

  /**
   * @desc Creates a person
   * @route POST /person
   */
  async createPerson(req, res) {
    try {
      const { name, age, hobbies } = await parseBodyData(req);
      const allFieldsFilled = [name, age, hobbies]
        .filter(field => !field).length === 0;

      if (!allFieldsFilled) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'All required fields must be filled' }));
      }

      const person = { name, age, hobbies };
      const newPerson = await Person.create(person);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newPerson));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: '500 Internal Server Error' }));
    }
  }

  /**
   * @desc Updates a person
   * @route PUT /person/:id
   */
  async updatePerson(req, res) {
    try {
      const { id } = req.params;

      if (!isUuid(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Person ID must be in uuid format' }));
      }

      const person = await Person.findById(id);
      
      if (!person) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Person with id ${id} not found` }));
      }

      let { name, age, hobbies } = await parseBodyData(req);

      const personData = {
        name: name || person.name,
        age: age || person.age,
        hobbies: hobbies || person.hobbies, 
      };

      const updatedPerson = await Person.update(id, personData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedPerson));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: '500 Internal Server Error' }));
    }
  }
  
  /**
   * @desc Deletes one person by id
   * @route DELETE /person/:id
   */
  async deletePerson(req, res) {
    try {
      const { id } = req.params;

      if (!isUuid(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Person ID must be in uuid format' }));
      }

      const person = await Person.findById(id);

      if (!person) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Person with id ${id} not found` }));
      }

      const deletedPerson = await Person.delete(id);

      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: '500 Internal Server Error' }));
    }
  }
}

module.exports = new PersonController();
