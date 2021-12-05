# Simple CRUD API
Simple CRUD API on pure Node.js

## Install dependecies
Install the dependencies in the local node_modules folder

    npm install
    
## NPM scripts
Run the application in development mode

    npm run start:dev
Run the application in production mode

    npm run start:prod

Run e2e tests

    npm test

## REST API
Implemented endpoints

### Get all Persons
Returns all persons
`GET /person`

### Get one Person

Returns person with specified id
`GET /person/:id`

### Create new Person
Creates new person
`POST /person`

### Update Person
Updates person with specified id
`PUT /person/:id`

### Delete Person
Deletes person with specified id
`DELETE /person/:id`
