const axios = require('axios');

exports.getAllBitcoinData = async (req, res) => {
  try {
    const result = await axios.get(
      'https://api.blockchain.com/v3/exchange/tickers/'
    );
    const data = result.data.filter(el => el.symbol.endsWith('USD'));
    res.status(200).json(data);
    // res.status(200).render('layout', responseData); // data
  } catch (err) {
    res.status(404).send('Error occurred...', err);
  }
};
