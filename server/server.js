const path = require('path');
const express = require('express');
const apiRouter = require('./routes/api');
const cors = require('cors');
const dotenv = require('dotenv');
// processes .env into process.env
dotenv.config();
const PORT = process.env.PORT || 3000;

// spin up our express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use api, go to apirouter
app.use('/api', apiRouter);

// console log while listening on our port 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})

module.exports = app;
