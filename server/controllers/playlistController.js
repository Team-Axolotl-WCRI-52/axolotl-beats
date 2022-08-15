const spotifyApi = require("../utils/apiWrapper");

const playlistController = {};

// create a new playlist in user's account 

playlistController.createPlaylist = async (req, res, next) => {
  try {
    const { genre } = req.body;
    spotifyApi.setAccessToken(req.cookies.access)
    spotifyApi.setRefreshToken(req.cookies.refresh);
    // TODO Extract playlist title & description from req.body (user input);
    // Note: ask FE if can include those fields on form
    const data = await spotifyApi.createPlaylist(
      `${genre} Axolotl Workout`,
      {'description': 'please work out', 'public': true}
    );
    res.locals.playlistId = data.body.id;
    return next();
  } catch (err) {
    return next({
      log: 'Failed to create new playlist',
      status: err.statusCode,
      message: { Error: 'Failed to create new playlist'}
    });
  }
};

playlistController.getRecommendations = async (req, res, next) => {
  try {
    // get genre, tempo, workout duration from user input 
    const { genre, tempo, duration } = req.body;
    // convert tempo string to min/max tempo
    // determine min max tempo for "fast" vs "slow" options
    // fast: 160-200
    // slow: 90-120
    // (STRETCH) meditation: 60-75 
    let tempoOption;
    if (tempo === 'fast') {
      tempoOption = {
        max_tempo: 200,
        min_tempo: 160
      }
    } else if (tempo === 'slow') {
      tempoOption = {
        max_tempo: 120,
        min_tempo: 90
      }
    }
    // figure out right param for total playlist duration (or track duration * number of tracks?)
    // "30-min"
    // say, target duration 4 min
    // 30/4 math ceil -> limit (i.e. number of songs)
    const targetPlaylistLengthInMinutes = parseInt(duration.match(/^[0-9]+/));
    const targetTrackDurationInMinutes = 4;
    const durationOption = {
      target_duration_ms: targetTrackDurationInMinutes * 60000,
      limit: Math.ceil(targetPlaylistLengthInMinutes / targetTrackDurationInMinutes)
    };

    // use genre in an async API call to get spotify IDs of 5 seed artists representative of that genre
    const recommendations = await spotifyApi.getRecommendations({
      seed_genres: [genre],
      ...tempoOption,
      ...durationOption
    });

    const tracksArr = recommendations.body.tracks;
    // save recommended tracks onto res.local
    res.locals.recommendations = tracksArr.map(el => el.uri);
    console.log('what are our tracks?', res.locals.recommendations);
    return next();
  } catch (err) {
    return next({
      log: 'Failed to get seed artists for Spotify recommendations',
      status: err.statusCode,
      message: { Error: 'Failed to get seed artists for Spotify recommendations'}
    });
  }
}

// add recommended tracks into playlist we created

playlistController.addTracks = async (req, res, next) => {
  try {
    await spotifyApi.addTracksToPlaylist(res.locals.playlistId, res.locals.recommendations);
    return next();
  } catch (err) {
    return next({
      log: 'Failed to add tracks to playlist',
      status: err.statusCode,
      message: { Error: 'Failed to add tracks to playlist' }
    });
  }
}

module.exports = playlistController;