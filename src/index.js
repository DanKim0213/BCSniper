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
  // res.sendFile(`${__dirname}/sniper.html`);
  try {
    const result = await axios.get(
      'https://api.coindesk.com/v1/bpi/currentprice/KRW.json'
    );
    // const data = result.data.bpi.USD.rate;
    const data = result.data.bpi;
    console.log(data);
    const responseData = { val: data.KRW.rate };
    res.status(200).render('layout', responseData); // data
  } catch (err) {
    console.log('Error occurred...', err);
  }
});
