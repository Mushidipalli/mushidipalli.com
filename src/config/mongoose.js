const ENV = require('../../config');

// mongoose config file
const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

mongoose.connect(ENV.valus.MONGODB_URL, {
  useNewUrlParser: true,
 
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;