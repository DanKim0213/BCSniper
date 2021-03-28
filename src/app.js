const express = require('express');
const morgan = require('morgan');
const path = require('path');
// const auctionRouter = require('./routes/auctionRoute');
const sniperRouter = require('./routes/sniperRoutes');
const itemRouter = require('./routes/itemRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(`${__dirname}`, 'views'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// app.use('/api/v1/sniper', auctionRouter);
app.use('/api/v1/sniper', sniperRouter);
app.use('/api/v1/items', itemRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Invalid route ${req.originalUrl}. Please try a valid route again.`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
