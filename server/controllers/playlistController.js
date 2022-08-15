const spotifyApi = require("../utils/apiWrapper");

const playlistController = {};

playlistController.createPlaylist = async (req, res, next) => {
  try {
    const { genre } = req.body;
    spotifyApi.setAccessToken(req.cookies.access)
    spotifyApi.setRefreshToken(req.cookies.refresh);
    // TODO Extract playlist title & description from req.body
    // Note: ask FE if can include those fields on form
    const data = await spotifyApi.createPlaylist(
      `${genre} Axolotl Workout`,
      {'description': 'please work out', 'public': true}
    );
    res.locals.playlistId = data.body.id;
    // console.log('what does our playlist id look like? ', data.id);
    //res.locals.playlistId = 'fake ID';
    return next();
  } catch (err) {
    return next({
      log: 'Failed to create new playlist',
      status: err.statusCode,
      message: { Error: 'Failed to create new playlist'}
    });
  }
};

playlistController.getRecommendationParams = async (req, res, next) => {
  try {
    // get genre, tempo, workout duration from user input 
    // use genre in an async API call to get spotify IDs of 5 seed artists representative of that genre
      // or some other way to get 5 seed artists or 5 seed tracks depending on what user input we ask for
    // decide min / max tempo based on inputted tempo description (i.e. fast vs slow)
    // figure out right param for total playlist duration (or track duration * number of tracks?)
    
    // save all above params onto res.local
    return next();
  } catch (err) {
    return next({
      log: 'Failed to get seed artists for Spotify recommendations',
      status: err.statusCode,
      message: { Error: 'Failed to get seed artists for Spotify recommendations'}
    });
  }
}

playlistController.getTracks = async (req, res, next) => {
  try {
    // invoke getRecommendations API call using the desired params stored on res.locals
      // e.g. seed artists/tracks, min tempo, max tempo, duration(?) 
    // save returned array of track IDs onto res.locals
    return next();
  } catch (err) {
    return next({
      log: 'Failed to get tracks based on user preferences',
      status: err.statusCode,
      message: { Error: 'Failed to get tracks based on user preferences'}
    });
  }
}

playlistController.addTracks = async (req, res, next) => {
  try {
    // get array of track IDs and playlist ID from res.locals
    // call addTracksToPlaylist with playlist ID and array of tracks
    // no need to save new info: playlist ID already saved
    return next();
  } catch (err) {
    return next({
      log: 'Failed to add tracks to playlist',
      status: err.statusCode,
      message: { Error: 'Failed to add tracks to playlist'}
    });
  }
}

module.exports = playlistController;