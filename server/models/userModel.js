//server/models/userModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    spotify_id: {type: String, required :true, unique: true},
    display_name: {type: String, required: true},
    playlist_id: {type: String, required: true}
})

module.exports = mongoose.model('User', userSchema);