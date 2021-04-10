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

    if (res.data.status !== 'success') {
      showAlert(`Failed with ${symbol}`, 'Something went wrong while updating!');
      return { price, status }
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// TODO: sell Item
const sellItem = async () => {
  try {
    const { preData, postData } = fetchData();
  } catch (err) {
    showAlert('error', err.response.data.message);
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
      await updateData(item.id, newItem.data.price_24h, status, item.symbol);
    }

  } catch (err) {
    showAlert('error', err.message);
  }
}

// Duration, minPrice, maxPrice
export const setData = async () => {
  try {
    
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}
