/* eslint-disable node/no-unsupported-features/es-syntax */
const axios = require('axios');
const { getAllSniperInfo } = require('./sniperController');

exports.getAllBitcoinData = async (req, res) => {
  try {
    const result = await axios.get(
      'https://api.blockchain.com/v3/exchange/tickers/'
    );
    const data = result.data.filter(el => el.symbol.endsWith('USD'));
    const newData = { sniper: await getAllSniperInfo(), ...data };
    res.status(200).json(newData);
  } catch (err) {
    res.status(404).send('Error occurred...', err);
  }
};
