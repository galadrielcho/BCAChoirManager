require('dotenv').config();

const {expressjwt:jwt} = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const jwtAuthz = require('express-jwt-authz');
var axios = require("axios").default;


var AuthenticationClient = require('auth0').AuthenticationClient;

var webAuth = new auth0.WebAuth({
  domain:       process.env.AUTH0_DOMAIN,
  clientID:     process.env.AUTH0_CLIENT_ID
});


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
      ) {
          let t = req.headers.authorization.split(" ")[1];
          currentJWT = t;
});
  
  

module.exports = {checkJwt, cors, jwtAuthz};    // TO DO: add account deletion
    throw error;
  });

}

function getUser(token) {
  webAuth.client.userInfo(token, function(err, user) {
    if (err) throw error;
    return user;
  });
}


// Parse the URL and extract the Access Token
webAuth.parseHash(window.location.hash, function(err, authResult) {
  if (err) {
    return console.log(err);
  }
  webAuth.client.userInfo(authResult.accessToken, function(err, user) {
      // This method will make a request to the /userinfo endpoint
      // and return the user object, which contains the user's information,
      // similar to the response below.
  });
});


module.exports = {checkJwt, cors, jwtAuthz, currentJWT, getManagementToken, getUser};