const express = require('express');
const spotifyApi = require('../utils/apiWrapper');
const querystring = require('node:querystring');

const router = express.Router();

// redirect to spotify auth form for user sign in

router.get('/auth', (req, res) => {
  console.log('inside backend request');
  // STRETCH: figure out scope prop & state prop 
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      redirect_uri: 'http://localhost:8080/api/getToken'}));
  });

// obtain access token and refresh token using code from user auth
// use instance of wrapper object "spotifyApi" and its methods to get and store tokens

router.get('/getToken', (req, res) => {
  console.log('redirected to next step');
  const { code } = req.query;

  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      // console.log(data.body);
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
      console.log('big obj:', spotifyApi);
      res.status(200).send('done');
    })
    .catch(err => console.log('spotify api web error'))

});

/*
  NEXT STEPS
  1. line 27 to redirect to a path that serves react UI for user form input
  2. have user submit their preferences from FE to BE
    a. will we have CORS problems? let's check.
    b. if so, can try same workaround, connecting user input button to link path 
      i. can try passing data as part of query string (e.g. '/?tempo=fast...')
  3. parse prefs data and continue on API call middlewares

  STRETCH(?) consideration: need to invoke wrapper method to refreshToken after token expires
    subproblem: how to detect token expiration? maybe when API call middleware errors
  
  TODO: API middlewares: check schema from spotify API docs and compare to API wrapper methods
  to see what is possible to query and manipulate/extract data 

  Note: if we need functionality not strictly covered by methods, will need to store 
  access token (via cookie/JWT/sessions?) so we can pull that and customize our own
  requests/queries
*/



  // we can also pass the token to the browser to make requests from there
  // store access token somehow? session? localstorage? cookie?  ? 
  // also possible to redirect to new react view and grab tokens from querystring

//   res.redirect('/#' +
//     querystring.stringify({
//       access_token: access_token,
//       refresh_token: refresh_token
//     }));
// } else {
//   res.redirect('/#' +
//     querystring.stringify({
//       error: 'invalid_token'
//     }));

  
  // TO DO: make post request to get access token
  // extract code from req params
  // package it into { } option obj 
  // make fetch post request to [spotify get token url]

  // res.status(200).send('done')


module.exports = router;