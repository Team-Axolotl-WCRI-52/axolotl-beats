//server/controllers/userController.js
const User = require('../models/userModel.js');
const userController = {}

//getAllUsers (find)
userController.getAllUsers = (req, res, next) => {
    User.find({})
    .exec()
    .then((data)=>{
        console.log('next in get all users', data);
        res.locals.data = data;
        next();
    })
    // () => {
    //     console.log('next in get all users');
    // }
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
    const spotify_id = "createDoc Id1"
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