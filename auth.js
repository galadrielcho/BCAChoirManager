const {expressjwt:jwt} = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const jwtAuthz = require('express-jwt-authz');

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://bca-choir-manager.us.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer
    audience: 'https://bcachoir.glitch.me/api/', //replace with your API's audience, available at Dashboard > APIs
    issuer: 'https://bca-choir-manager.us.auth0.com/',
    algorithms: [ 'RS256' ]
});
  
  

module.exports = {checkJwt, cors, jwtAuthz};