const express = require('express');
const querystring = require('node:querystring');

const router = express.Router();

router.get('/auth', (req, res) => {
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = 'http://localhost:8080/';
  console.log('inside backend request');

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      redirect_uri: redirect_uri}));

  // res.redirect('https://google.com');
  });

module.exports = router;