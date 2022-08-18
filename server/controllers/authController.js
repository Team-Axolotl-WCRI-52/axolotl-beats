const spotifyApi = require("../utils/apiWrapper");
const querystring = require('node:querystring');

const authController = {};


authController.checkUserAuth = async (req, res, next) => {
  if ('access' in req.cookies) spotifyApi.setAccessToken(req.cookies.access)
  else {
    console.log('no cookies :(');
    res.locals.authenticatedUser = null;
    return next();
  }

  try {
    const data = await spotifyApi.getMe()
    if (data.statusCode === 200) res.locals.authenticatedUser = data.body;
    return next();
  } catch (err) {
    return next({
      log: 'Failed to verify user authentication',
      status: err.statusCode,
      message: { err }
    });
  }
};


/*
** redirect to spotify auth form for user sign in/authentication
** obtain access token and refresh token using code from user auth
** use instance of wrapper object "spotifyApi" and its methods to get and store tokens
*/
authController.getToken = (req, res, next) => {
  spotifyApi.authorizationCodeGrant(req.query.code)
    .then(data => {
      const { access_token, refresh_token } = data.body;
      res.cookie('access', access_token).cookie('refresh', refresh_token);
      return next();
    })
    .catch(err => {
      console.log(err)
      res.status(err.statusCode).json(`Error: Status Code ${err.statusCode}`)});
}


/*
** redirect to spotify auth form for user sign in/authentication
*/
authController.getAuthCode = (req, res, next) => {
  const scope = 'playlist-modify-public';
  res.locals.params = querystring.stringify({
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    scope
  })
  return next();
}

module.exports = authController;