require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 3001;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Applictaion running on ${port}`);
});
