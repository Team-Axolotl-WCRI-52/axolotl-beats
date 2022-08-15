const path = require('path');
const express = require('express');
const apiRouter = require('./routes/api');
const cors = require('cors');
// processes .env into process.env
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;

// spin up our express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// use api, go to apirouter
app.use('/api', apiRouter);

app.get('/*', (req, res) => {
  console.log('in server.js, rerouting from spotify auth middleware.')
  console.log(path.resolve(__dirname, '../../client/index.html'));
  res.sendFile(path.resolve(__dirname, '../../client/index.html'))
})

// console log while listening on our port 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})

module.exports = app;
