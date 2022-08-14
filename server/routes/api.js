const express = require('express');
const querystring = require('node:querystring');

const router = express.Router();

router.get('/auth', (req, res) => {
  const client_id = process.env.CLIENT_ID;
  // revise uri /api/getToken
  const redirect_uri = 'http://localhost:8080/api/getToken';
  console.log('inside backend request');

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      redirect_uri: redirect_uri}));

  });

  router.get('getToken', (req, res) => {
    // TO DO: make post request to get access token
    // extract code from req params
    // package it into { } option obj 
    // make fetch post request to [spotify get token url]
    // ???
    // profit? 
    // store access token somehow? session? localstorage? cookie? 
  });

module.exports = router;