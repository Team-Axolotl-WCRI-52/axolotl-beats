const express = require('express');
const spotifyApi = require('../utils/apiWrapper');
const querystring = require('node:querystring');
const playlistController = require('../controllers/playlistController');
const userController = require('../controllers/userController')

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
      // redirect_uri: process.env.REDIRECT_URI,
      redirect_uri: 'http://localhost:8080/api/getToken',
      // show_dialog: true,
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
      console.log('authorizationCodeGrant data.body: ', data.body);
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
  // new middleware to save newlycreated playlist id (res.locals.playlist_id) & spotify user id (res.locals.spotid)
  (req, res) => {
    res.status(200).json(res.locals.playlistId)
  }
);

/*
  STRETCH consideration: need to invoke wrapper method to refreshToken after token expires
    subproblem: how to detect token expiration? maybe when API call middleware errors
*/
//This is only for development purposes to see all of our documents
router.get('/users/all', userController.getAllUsers, (req, res, err) => {
  //res.send(200).json(res.locals.users)
  res.status(200).json(res.locals.data);
})

router.post('/users/', userController.getDoc, (req, res, err) => {
  res.status(200).json(res.locals.doc)
})

router.post('/users/create/', 
  userController.createDoc, 
  (req, res, err) => {
  res.status(200).send('I\'m still a teapot');
  // res.send(200).json(res.locals.doc)
})

router.patch('/users/update/', userController.updateDoc, (req, res, err) => {
  res.status(200).json(res.locals.doc)
})

module.exports = router;