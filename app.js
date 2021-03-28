require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

const PORT = process.env.PORT;

const app = express();

dbConnection();

app.use(cors());
app.use(express.json());
// app.use(express.static('public'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(PORT, () => {
  console.log('Server listening on http://localhost:4000');
});
