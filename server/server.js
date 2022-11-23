const path = require('path');
const express = require('express');
const apiRouter = require('./routes/api');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// processes .env into process.env
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;

// spin up our express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// use api, go to apirouter
app.use('/api', apiRouter);

// redirect to react UI
app.get('/*', (req, res) => {
  // console.log('in server.js, rerouting from spotify auth middleware.');
  // console.log(path.resolve(__dirname, '../../client/index.html'));
  res.sendFile(path.resolve(__dirname, '../../client/index.html'));
})

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Unknown error - Express global error handler.',
    status: 500,
    message: { err: 'There is a problem.' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// console log while listening on our port 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})

module.exports = app;
