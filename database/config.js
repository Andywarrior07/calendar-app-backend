const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.URL_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Database successful connection');
  } catch (err) {
    console.log(err);
    throw new Error('Error initializing database connection');
  }
};

module.exports = {
  dbConnection,
};
