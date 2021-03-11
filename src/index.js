/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Applictaion running on ${port}`);
});
app.set('view engine', 'pug');
app.set('views', path.join(`${__dirname}`, 'views'));

if (process.env.DEV_ENV === 'develop') {
  app.use(morgan('dev'));
}

app.get('/sniper', async (req, res) => {
  try {
    const result = await axios.get(
      'https://api.blockchain.com/v3/exchange/tickers/'
    );
    console.log(result);
    const data = result.data.filter(el => el.symbol.endsWith('USD'));
    console.log(data);
    res.status(200).json(data);
    // res.status(200).render('layout', responseData); // data
  } catch (err) {
    console.log('Error occurred...', err);
  }
});
