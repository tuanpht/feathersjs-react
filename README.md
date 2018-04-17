# Feathers and React demo

- Format code with [Prettier](https://prettier.io/docs/en/editors.html)

- Folders:
  + `client`: React frontend
  + `server`: Featherjs server

- Tools:
  + `nodemon`: Auto restart server `npm install -g nodemon`
  + `concurrently`: Run client and server concurrently `npm install -g concurrently`

- Start dev mode
  + `./start-server-client.js`

- Production
  + Edit config file `./server/config/production.json`
  + (cd client && npm run build)
  + (cd server && NODE_ENV=production npm start)
