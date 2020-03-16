# git-bits-dun

Here's a live demo: http://ec2-18-204-130-155.compute-1.amazonaws.com

## To run in local
Note: please download/install Node and NPM if you don't have them on your computer before going through the following instruction: https://nodejs.org/en/download/
### Bring up backend api service (NodeJS/Express)
- `cd api` and `npm install` and `npm install --dev` to install all dependencies for backend api
- create custom environment file `.env` and populate it with at least a `DB_CONNECTION` field with the mongo connection string of your choice.
- `npm start` to bring up the server on port 3000.

### Start frontend (Angular)
- `cd frontend` and do `npm install` and `npm install --dev` to install all dependencies for the Angular frontend.
- Make sure the above api service is up and running, then `ng serve` to bring up the Angular app.

Finally, open up the browser and go to http://localhost:4200

