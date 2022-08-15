const express = require('express');
const spotifyApi = require('../utils/apiWrapper');
const querystring = require('node:querystring');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

// redirect to spotify auth form for user sign in/authentication

router.get('/auth', (req, res) => {
  // console.log('inside backend request');
  const scope = 'playlist-modify-public';
  // STRETCH: figure out scope prop & state prop 
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      scope
    }));
  });

// obtain access token and refresh token using code from user auth
// use instance of wrapper object "spotifyApi" and its methods to get and store tokens

router.get('/getToken', (req, res) => {
  console.log('redirected to next step');
  const { code } = req.query;

  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      // console.log(data.body);
      const { access_token, refresh_token } = data.body;
      // STRETCH: maybe setInterval and refreshToken here
      // spotifyApi.setAccessToken(data.body['access_token']);
      // spotifyApi.setRefreshToken(data.body['refresh_token']);
      res.cookie('access', access_token).cookie('refresh', refresh_token);
      console.log('big obj:', spotifyApi);
      res.redirect('/#/playlistform');
    })
    .catch(err => {
      console.log(err)
      res.status(err.statusCode).json(`Error: Status Code ${err.statusCode}`)});
});

router.post('/getPlaylist',
  playlistController.createPlaylist,
  playlistController.getRecommendations,
  playlistController.addTracks,
  (req, res) => {
    res.status(200).json(res.locals.playlistId)
  }
);

/*
  NEXT STEPS
  1. have user submit their preferences from FE to BE
    a. will we have CORS problems? SO FAR SO GOOD
    b. if so, can try same workaround, connecting user input button to link path 
      i. can try passing data as part of query string (e.g. '/?tempo=fast...')
  2. semi-stretch?: ask user to add playlist title and description
  3. parse prefs data and continue on API call middlewares

  STRETCH(?) consideration: need to invoke wrapper method to refreshToken after token expires
    subproblem: how to detect token expiration? maybe when API call middleware errors

*/


module.exports = router;