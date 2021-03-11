const express = require('express');
const morgan = require('morgan');
const path = require('path');
const auctionRouter = require('./routes/auctionRoute');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(`${__dirname}`, 'views'));

if (process.env.DEV_ENV === 'develop') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bitcoins', auctionRouter);

module.exports = app;