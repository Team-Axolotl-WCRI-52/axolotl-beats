const express = require('express');
const spotifyApi = require('../utils/apiWrapper');
const querystring = require('node:querystring');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

// redirect to spotify auth form for user sign in/authentication

router.get('/auth', (req, res) => {
  // console.log('inside backend request');
  const scope = 'playlist-modify-public';
  // STRETCH: add state prop for additional validation
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
      // spotifyApi.setAccessToken(access_token);
      // spotifyApi.setRefreshToken(refresh_token);
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

router.post('/getDynamicPlaylist',
  playlistController.createPlaylist,
  playlistController.getDynamicRecommendations,
  playlistController.addTracks,
  (req, res) => {
    res.status(200).json(res.locals.playlistId)
  }
);

/*
  STRETCH consideration: need to invoke wrapper method to refreshToken after token expires
    subproblem: how to detect token expiration? maybe when API call middleware errors
*/


module.exports = router;