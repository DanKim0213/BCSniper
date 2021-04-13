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

export const sellItemNow = async ({symbol, itemId, status}) => {
  try {
    // 1) calculate Profit
    const coin = await axios({
      method: 'GET',
      url: `https://api.blockchain.com/v3/exchange/tickers/${symbol}`
    });
    const sniper = await axios({
      method: 'GET',
      url: '/api/v1/sniper/me'
    });

    const sniperMoney = sniper.data.data.data.money;
    const profit = coin.data.price_24h - sniper.data.data.data.items.find(el => el._id === itemId).purchasedAt;

    // 2) update Sniper's money
    const deleteItem = axios({
      method: 'DELETE',
      url: `/api/v1/items/${itemId}`
    });
    const updateSniper = axios({
      method: 'PATCH',
      url: '/api/v1/sniper/me',
      data: {money: sniperMoney + (profit).toFixed(2) * 1}
    });
    const res = await Promise.all([ deleteItem, updateSniper ]);

    if (res[0].status === 204 && res[1].status === 200) {
      const finalVerb = status === 'WINNING'? 'WON' : 'LOST';
      showAlert('success', `${symbol} is sold. You ${finalVerb}.`);
      return 'success';
    }

  } catch (err) {
    showAlert('error', 'Something went wrong while Selling Item');
  }
};

// TODO: sellItem based on Duration, minPrice, and maxPrice
export const sellItem = async () => {
  try {
    
  } catch (err) {
    showAlert('error', err.message); 
  }
}
