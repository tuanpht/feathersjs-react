# Feathers and React demo

- Format code with [Prettier](https://prettier.io/docs/en/editors.html)
  + Vscode:
    + Install: https://github.com/prettier/prettier-vscode
    + Config: `"editor.formatOnSave": false`

- Folders:
  + `client`: React frontend
  + `server`: Featherjs server

- Tools:
  + `feathers`: CLI tool to generate feathers component `npm install @feathersjs/cli -g`
  + `nodemon`: Auto restart server `npm install -g nodemon`
  + `concurrently`: Run client and server concurrently `npm install -g concurrently`

- Start dev mode
  + `./start-server-client.js`

- Test
  + (cd server && NODE_ENV=test npm test)

- Production
  + Edit config file `./server/config/production.json`
  + (cd client && npm run build)
  + (cd server && NODE_ENV=production npm start)
