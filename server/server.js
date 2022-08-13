const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;


// spin up our express app
const app = express();

// console log while listening on our port 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})