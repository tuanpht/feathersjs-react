import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import {WS_PATH} from './constants';
import {SERVICE} from './constants';

const socket = io(window.location.origin, {
  path: WS_PATH,
});

const client = feathers();
client.configure(feathers.socketio(socket));

client.configure(
  feathers.authentication({
    storage: window.localStorage,
    path: SERVICE.AUTH,
  })
);

export default client;
