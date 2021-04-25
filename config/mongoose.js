const mongoose = require('mongoose');
const DB = require('./keys').MongoURI;

// CONNECT TO DATABASE
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Succeeded Connected to: ' + DB))
  .catch((err) => console.log('DATABASE ERROR: ' + DB + err));

// DATABASE CONNECTION
const DBConnection = mongoose.connection;
DBConnection.once('open', () => console.log('Succeeded Connection to DB'));
DBConnection.on('error', (error) => {
  console.log('Connection Error: ', error);
});
