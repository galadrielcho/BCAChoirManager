require('dotenv').config();

const {expressjwt:jwt} = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const jwtAuthz = require('express-jwt-authz');
var axios = require("axios").default;
const auth0 = require('auth0');

var currentJWT = "";


// var AuthenticationClient = require('auth0').AuthenticationClient;

// var webAuth = new auth0.WebAuth({
//   domain:       process.env.AUTH0_DOMAIN,
//   clientID:     process.env.AUTH0_CLIENT_ID
// });


const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://bca-choir-manager.us.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_DOMAIN,
    algorithms: [ 'RS256' ],

    setToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
          let t = req.headers.authorization.split(" ")[1];
          currentJWT = t;
      } else if (req.query && req.query.token) {  
        currentJWT = req.query.token;
      }
      currentJWT = "";
    }

});

var managementTokenOptions = {
  method: 'POST',
  url: 'https://' + process.env.AUTH0_DOMAIN + '/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.AUTH0_M2M_CLIENT_ID,
    client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
    audience: 'https://'+ process.env.AUTH0_DOMAIN + '/api/v2/'
  })
};

function getManagementToken() {
  axios.request(managementTokenOptions).then(function (response) {
    let managementToken = response.data.access_token;
    return managementToken;
  }).catch(function (error) {
    // TO DO: add account deletion
    throw error;
  });

}

function getUser(token) {
  webAuth.client.userInfo(token, function(err, user) {
    if (err) throw error;
    return user;
  });
}


// // Parse the URL and extract the Access Token
// webAuth.parseHash(window.location.hash, function(err, authResult) {
//   if (err) {
//     return console.log(err);
//   }
//   webAuth.client.userInfo(authResult.accessToken, function(err, user) {
//       // This method will make a request to the /userinfo endpoint
//       // and return the user object, which contains the user's information,
//       // similar to the response below.
//   });
// });


module.exports = {checkJwt, cors, jwtAuthz, currentJWT, getManagementToken, getUser};