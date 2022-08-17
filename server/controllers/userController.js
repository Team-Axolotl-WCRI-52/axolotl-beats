//server/controllers/userController.js
const User = require('../models/userModel.js');
const spotifyApi = require('../utils/apiWrapper');

const userController = {}


userController.getUserToken = (req, res, next) => {
    console.log('userController.getUserToken executed');
    const { code } = req.query;
    console.log('code is: ', code);

  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      console.log('authorizationCodeGrant data.body: ', data.body);
      const { access_token, refresh_token } = data.body;
      // STRETCH: maybe setInterval and refreshToken here
      // spotifyApi.setAccessToken(access_token);
      // spotifyApi.setRefreshToken(refresh_token);
      res.cookie('access', access_token).cookie('refresh', refresh_token);
      console.log('userController.getUserToken spotifyApi: ', spotifyApi);
      next()
    })
    .catch(err => {
      console.log('userController.getUserToken err: ', err)
      res.status(err.statusCode).json(`Error: Status Code ${err.statusCode}`)});
}

userController.checkIfUserExists = (req, res, next) => {
    
}


//getAllUsers (find)
userController.getAllUsers = (req, res, next) => {
    User.find({})
    .exec()
    .then((data)=>{
        console.log('next in get all users', data);
        res.locals.data = data;
        next();
    })
}


//getDoc (findOne)
userController.getDoc = (req, res, next) => {
    const { spotify_id } = req.body
    
    console.log('userController.getDoc req.body.id: ', spotify_id)
    User.findOne({spotify_id}, (err, doc) => {
        if(err){
            return next('Error in userController.getDoc: ' + JSON.stringify(err))
        }
        res.locals.doc = doc;
        next()
    })
}


//createDoc (create)
userController.createDoc = (req, res, next) => {
    const spotify_id = "spotify_id"
    console.log('userController.createDoc req.params.id: ', spotify_id)
    const playlist_id = "playlistId goes here";
    User.create({spotify_id, playlist_id}, (err, doc) => {
        if(err){
            return next('Error in userController.createDoc: ' + JSON.stringify(err))
        }
        //res.locals.doc = doc;
        next()
    })
}


//updateDoc (findOneAndUpdate)
userController.updateDoc = (req, res, next) => {
    const {spotify_id, playlist_id} = req.body
    //console.log('userController.updateDoc req.params.id: ', id)
    User.findOneAndUpdate({spotify_id}, {playlist_id}, {new:true}, (err, doc) => {
        if(err){
            return next('Error in userController.updateDoc: ' + JSON.stringify(err))
        }
        res.locals.doc = doc;
        next()
    })
}


module.exports = userController;