# Don't Be Stupid 

This application is run entirely from server; first you have to build the frntend
```bash
cd frontend 
yarn
yarn build

```
then launch nest:

```bash
cd server
yarn start:dev

```
This will open your server at port 3000

## Server .env files

The following keys are needed for the server only if you want to run 
the admin/quesiton enerator

```javascript

OPENAI_API_KEY=#####

```

## MongoDB

The MongoDB database is set to run at `mongodb://localhost/nest`

it is hard-cocoded in `app.module.ts` if you want to redirect it to another source. 

An extensive question list and the categories are dumped out to Mongo-dump/nest.

