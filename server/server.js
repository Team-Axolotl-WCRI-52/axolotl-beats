const path = require('path');
const express = require('express');
const apiRouter = require('./routes/api');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 3000;

// spin up our express app
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use api, go to apirouter
app.use('/api', apiRouter);

// console log while listening on our port 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})

module.exports = app;
