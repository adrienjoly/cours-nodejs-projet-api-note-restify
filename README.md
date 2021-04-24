# API-note

#### This is an HTTP API made with Restify for managing personal notes.

## Get started

#### Clone project

`$ git clone git@github.com:nguyen.1909/API-note.git`<br/>
`$ cd API-note`

#### Install the dependencies

`$ npm install`

#### Run project

`$ npm start` or `$ npm run dev`<br/>

## Environment

**The API is deployed with [Heroku](https://www.heroku.com) on https://api-note-3moc.herokuapp.com/**<br/>
_GitHub integration is enabled, so the API is automatically re-deployed on Heroku when there is a new push on `main`_

#### Environment variables

- `PORT`: port on which the server will listen requests, default `8080`
- `MONGODB_URI`: URI for MongoDB database connexion
- `DB_NAME`: MongoDB database name
- `JWT_KEY`: JWT secret key

## Tests

Automatic tests have been written with [Mocha](https://mochajs.org/).
You can execute them by running : <br/>
`$ npm test `

## Routes API

#### POST /signup

##### Request

###### Body

- `username` (Between 2 and 20 characters, in lowercase, without special characters)
- `password` (Minimum 4 characters)
  <br/>

#### POST /signin

##### Request

###### Body

- `username` (Between 2 and 20 characters, in lowercase, without special characters)
- `password` (Minimum 4 characters)
  <br/>

#### GET /notes

##### Request

###### Headers

- `x-access-token` (JWT token)
  <br/>

#### PUT /notes

##### Request

###### Body

- `content` (Note content)

###### Headers

- `x-access-token` (JWT token)
  <br/>

#### PATCH /notes/:id

##### Request

###### Parameters

- `id` (Note ID)

###### Body

- `content` (Note content)

###### Headers

- `x-access-token` (JWT token)
  <br/>

#### DELETE /notes/id

##### Request

###### Parameters

- `id` (Note ID)

###### Headers

- `x-access-token` (JWT token)

## Contributor

- NGUYEN David
- VALLEE Gwendal
- BROUILLE Théo
- GAMIZ Théo
