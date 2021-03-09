const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('Applictaion running on 3000');
});

app.get('/sniper', (req, res) => {
  // res.send('OK');
  res.sendFile(`${__dirname}/sniper.html`);
});
// console.log('"Hello World!"');
