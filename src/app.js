const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const viewRouter = require('./routes/viewRoutes');
const sniperRouter = require('./routes/sniperRoutes');
const itemRouter = require('./routes/itemRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(`${__dirname}`, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', viewRouter);
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
