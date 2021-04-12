import axios from 'axios';
import { showAlert } from './alerts';

export const createItem = async (item) => {
  try {
    const coin = await axios({
      method: 'GET',
      url: `https://api.blockchain.com/v3/exchange/tickers/${item.symbol}`
    });

    if (coin.data.last_trade_price >= item.maxPrice || coin.data.last_trade_price <= item.minPrice)
      throw new Error('Max or Min validation error');

    const res = await axios({
      method: 'POST',
      url: '/api/v1/items',
      data: {
        symbol: item.symbol,
        duration: item.duration,
        price: coin.data.last_trade_price,
        maxPrice: item.maxPrice,
        minPrice: item.minPrice
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', `ITEM ${item.symbol} updated successfully!`);
      location.assign('/sniper');
    }
    
  } catch (err) {
    showAlert('error', 'Uh-oh Something went wrong!!! Please check validation or the item available'); 
  }
}