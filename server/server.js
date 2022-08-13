const path = require('path');
const express = require('express');

const PORT = 3000;
// process.env.PORT || 

// spin up our express app
const app = express();


app.use(express.json);
//app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '../build')))
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
})


// console log while listening on our port 

// * added the module.exports below
module.exports = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})