const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_URI;
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
}).then(() => console.log('MongoDB connected successfully'))
  .catch(error => console.log(error));


  