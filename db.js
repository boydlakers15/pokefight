const mongoose = require('mongoose');
const DB_URI = 'mongodb+srv://jboyd115:dYYJsqFYm83oqsMB@cluster0.1xachzw.mongodb.net/test';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(error => console.log(error));
