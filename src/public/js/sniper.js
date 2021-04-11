import axios from 'axios';
import { showAlert } from './alerts';

const updateData = async (id, price, status, symbol) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/sniper/items/${id}`,
      data: {
        price,
        status,
        priceChangedAt: Date.now()
      }
    });

    return { nprice: price, nstatus: status }
  } catch (err) {
    showAlert('error', err.message);
  }
};

export const watchItem = async (item) => {
  try {
    // 1) Fetch Data
    const newItem = await axios({
      method: 'GET',
      url: `https://api.blockchain.com/v3/exchange/tickers/${item.symbol}`
    });
    
    // 2) Compare and Update
    if (item.price !== newItem.data.price_24h) {
      const status = item.purchasedAt*1 < newItem.data.price_24h*1 ? 'WINNING' : 'LOSING';
      return await updateData(item.id, newItem.data.price_24h, status, item.symbol);
    }

  } catch (err) {
    showAlert('error', 'Something went wrong while watching!!!');
  }
}

// TODO: sellItem and setData
export const sellItem = async () => {
  try {

  } catch (err) {
    showAlert('error', err.message);
  }
};

// Duration, minPrice, maxPrice
export const setData = async () => {
  try {
    
  } catch (err) {
    showAlert('error', err.message);
  }
}
