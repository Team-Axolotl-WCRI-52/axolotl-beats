const spotifyApi = require("../utils/apiWrapper");

const playlistController = {};

// create a new playlist in user's account 
playlistController.createPlaylist = async (req, res, next) => {
  try {
    const { genre, playlistName, playlistDescription } = req.body;
    spotifyApi.setAccessToken(req.cookies.access)
    spotifyApi.setRefreshToken(req.cookies.refresh);
    const data = await spotifyApi.createPlaylist(
      `${playlistName}`,
      { 'description': `${playlistDescription}`, 'public': true }
    );
    res.locals.playlistId = data.body.id;
    return next();
  } catch (err) {
    return next({
      log: 'Failed to create new playlist',
      status: err.statusCode,
      message: { Error: 'Failed to create new playlist' }
    });
  }
};

// get recommended tracks based on user preference
playlistController.getRecommendations = async (req, res, next) => {
  try {
    const { genre, tempo, duration } = req.body;
    // convert tempo string to min/max tempo
    // determine min/max tempo for "fast" vs "slow" options
    // fast: 160-200
    // slow: 90-120
    // (optional to add) meditation: 60-75 
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

    // convert user requested workout duration to a collection of tracks
    // const targetPlaylistLengthInMinutes = parseInt(duration.match(/^[0-9]+/));
    const targetPlaylistLengthInMinutes = duration;
    // const targetPlaylistLengthInMinutes = 10; // for testing shorter playlist

    // approach 1: designate set target duration for each track, use math to figure out number of tracks
    // pro: only one API call needed, relatively fast
    // con: based on how target_duration works in Spotify API,
    // all tracks would be exactly that duration (e.g. 4:00) or very close

    // const targetTrackDurationInMinutes = 4;
    // const durationOption = {
    //   target_duration_ms: targetTrackDurationInMinutes * 60000,
    //   limit: Math.ceil(targetPlaylistLengthInMinutes / targetTrackDurationInMinutes)
    // };
    // const recommendations = await spotifyApi.getRecommendations({
    //   seed_genres: [genre],
    //   ...tempoOption,
    //   ...durationOption
    // });
    // const tracksArr = recommendations.body.tracks;
    // res.locals.recommendations = tracksArr.map(el => el.uri);

    // approach 2: set a random target duration for each track based on some min/max length
    // then use a loop to call and obtain each track of varying duration individually
    // pro: playlist will have tracks of varying lengths
    // con: need multiple calls to API for each playlist:
    // UX concerns about time complexity // this does take several seconds or more for 30-min+ playlist
    // also: API rate limit concerns since we need multiple calls per playlist

    // helper func: takes in min/max track length in minutes, returns random length in between, in ms
    const getRandomDuration = (min, max) => {
      const minDurationInMS = min * 60000;
      const maxDurationInMS = max * 60000;
      const range = maxDurationInMS - minDurationInMS;
      return Math.floor((Math.random() * range) + minDurationInMS);
    };

    let playlistDuration = 0;
    const targetPlaylistLengthInMS = targetPlaylistLengthInMinutes * 60000;
    const recommendations = [];
    while (playlistDuration < targetPlaylistLengthInMS) {
      // hardcoding min/max durations to be 2.5 minutes and 5.5 minutes
      // could be user input instead
      const trackDuration = getRandomDuration(2.5, 5.5);
      console.log('random target duration:', trackDuration);
      // set limit to 1 to get one track at a time
      const durationOption = {
        target_duration_ms: trackDuration,
        limit: 1
      };
      const recommendation = await spotifyApi.getRecommendations({
        seed_genres: [genre],
        ...tempoOption,
        ...durationOption
      });
      const track = recommendation.body.tracks; // expects to look like [{track}]
      recommendations.push(...track);
      playlistDuration += trackDuration;
    }
    const tracksArr = recommendations;
    res.locals.recommendations = tracksArr.map(el => el.uri);

    return next();
  } catch (err) {
    return next({
      log: 'Failed to get seed artists for Spotify recommendations',
      status: err.statusCode,
      message: { Error: 'Failed to get seed artists for Spotify recommendations' }
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