const SpotifyWebApi = require('spotify-web-api-node');
// processes .env into process.env
const dotenv = require('dotenv');
dotenv.config();

// create instance of SpotifyWebApi object, export it

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  // redirectUri: process.env.REDIRECT_URI
  redirectUri: 'http://localhost:8080/api/getToken'
});

// console.log('client id:', process.env.CLIENT_ID);

module.exports = spotifyApi;