const request = require('supertest');
const server = require('../../src/server');

describe('First scenario', () => {
  let id = '';

  it('should return empty array', async () => {
    const res = await request(server).get('/person');

    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual([]);
  });

  it('should create new user and return it', async () => {
    const res = await request(server)
      .post('/person')
      .send({ 
        name: 'John Doe',
        age: 21,
        hobbies: ['stamp collecting'],
      });
    
    id = res.body.id;

    expect(res.statusCode).toBe(201);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body.name).toBe('John Doe');
  });

  it('should return user by specified id', async () => {
    const res = await request(server).get(`/person/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body.name).toBe('John Doe');
  });

  it('should return user with updated age', async () => {
    const res = await request(server)
      .put(`/person/${id}`)
      .send({ age: 100 });

    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body.age).toBe(100);
  });

  it('should delete user by specified id', async () => {
    const res = await request(server)
      .delete(`/person/${id}`);

    expect(res.statusCode).toBe(204);
  });

  it('should return message that user isnt found', async () => {
    const res = await request(server).get(`/person/${id}`);

    expect(res.statusCode).toBe(404);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body.message).toBe(`Person with id ${id} not found`);
  });
});


describe('Second scenario', () => {
  let id = '';

  it('should create new user and return it', async () => {
    const res = await request(server)
      .post('/person')
      .send({ 
        name: 'Pablo Picasso',
        age: 140,
        hobbies: ['painting'],
      });
    
    id = res.body.id;

    expect(res.statusCode).toBe(201);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body.name).toBe('Pablo Picasso');
    expect(res.body.age).toBe(140);
    expect(res.body.hobbies).toEqual(['painting']);
  });

  it('should return message about wrong format of id', async () => {
    const res = await request(server).get('/person/123');

    expect(res.statusCode).toBe(400);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body.message).toBe('Person ID must be in uuid format');
  });

  it('should return array with one object', async () => {
    const res = await request(server).get('/person');

    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body.length).toBe(1);
  });

  it('should delete user by specified id', async () => {
    const res = await request(server)
      .delete(`/person/${id}`);

    expect(res.statusCode).toBe(204);
  });

  it('should return empty array after deletion of user', async () => {
    const res = await request(server).get('/person');

    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual([]);
  });
});

describe('Third scenario', () => {
  let id = '';

  it('should create new user and return it', async () => {
    const res = await request(server)
      .post('/person')
      .send({ 
        name: 'Michael Schumacher',
        age: 52,
        hobbies: ['auto racing'],
      });
    
    id = res.body.id;

    expect(res.statusCode).toBe(201);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body.name).toBe('Michael Schumacher');
    expect(res.body.age).toBe(52);
    expect(res.body.hobbies).toEqual(['auto racing']);
  });

  it('should return message that user with specified id not found', async () => {
    const res = await request(server)
      .get('/person/2e2ca3d9-fa40-49bc-834c-2208437bb108');

    expect(res.statusCode).toBe(404);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body.message)
      .toBe('Person with id 2e2ca3d9-fa40-49bc-834c-2208437bb108 not found');
  });

  it('should return message that user with specified id not found', async () => {
    const res = await request(server)
      .put('/person/2e2ca3d9-fa40-49bc-834c-2208437bb108')
      .send({ age: 30 });

    expect(res.statusCode).toBe(404);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body.message)
      .toBe('Person with id 2e2ca3d9-fa40-49bc-834c-2208437bb108 not found');
  });

  it('should return message that user with specified id not found', async () => {
    const res = await request(server)
      .delete('/person/2e2ca3d9-fa40-49bc-834c-2208437bb108');

    expect(res.statusCode).toBe(404);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body.message)
      .toBe('Person with id 2e2ca3d9-fa40-49bc-834c-2208437bb108 not found');
  });

  it('should delete user by specified id', async () => {
    const res = await request(server)
      .delete(`/person/${id}`);

    expect(res.statusCode).toBe(204);
  });
});