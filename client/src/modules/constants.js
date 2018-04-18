const apiPrefix = name => '/api/' + name;

export const WS_PATH = '/ws';

export const SERVICE = {
  AUTH: apiPrefix('authentication'),
  USER: apiPrefix('users'),
};
