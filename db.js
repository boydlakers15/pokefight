const mongoose = require('mongoose');

// mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(error => console.log(error));

const DB_URI = 'mongodb+srv://jboyd:OibvL7Uxyzpeqq1J@cluster0.klbynli.mongodb.net/test';
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
}).then(() => console.log('MongoDB connected successfully'))
  .catch(error => console.log(error));

  