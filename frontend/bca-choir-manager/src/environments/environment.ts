export const environment = {
  production: false,
  auth0: {
    domain: 'bca-choir-manager.us.auth0.com',
    clientId: 'rfDAbzcqSurbXNtz8kczhkkJU7fwiGr7',
    authorizationParams: {
      audience: 'https://bcachoir.glitch.me/api/',
      redirect_uri: 'http://localhost:4200/callback',
    },
  },
  api: {
    serverUrl: 'http://localhost:8080',
  },
};
