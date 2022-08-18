const express = require('express');
const playlistController = require('../controllers/playlistController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/auth',
  authController.getAuthCode,
  (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' + res.locals.params);
  });

router.get(
  '/getToken',
  authController.getToken,
  (req, res) => {
  res.redirect("/#/playlistform")
  });


router.get(
  '/checkUserAuth',
  authController.checkUserAuth,
  (req, res) => {
  res.status(200).json(res.locals.authenticatedUser)
});


/*
** generate new playlist with static criteria
*/
router.post(
  '/getPlaylist',
  playlistController.createPlaylist,
  playlistController.getRecommendations,
  playlistController.addTracks,
  (req, res) => {
    res.status(200).json(res.locals.playlistId)
  }
);


/*
** generate new playlist with dynamic criteria
*/
router.post(
  '/getDynamicPlaylist',
  playlistController.createPlaylist,
  playlistController.getDynamicRecommendations,
  playlistController.addTracks,
  (req, res) => {
    res.status(200).json(res.locals.playlistId)
  }
);


module.exports = router;