import axios from 'axios';
import { showAlert } from './alerts';

const fetchData = async () => {
  try {

  } catch (err) {
    showAlert('error while Fetching data!!!', err.response.data.message);
  }
};

const compareData = (preData, postData) => {
  try {

  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

const updateData = async (itemId, price, status) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/sniper/items/${itemId}`,
      data: {
        price,
        status,
        priceChangedAt: Date.now()
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'updated in successfully!');
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
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

export const watchData = async (sniperId) => {
  try {
    // 1) Fetch Data
    const preData = await axios({
      method: 'GET',
      url: `/api/v1/sniper/me/${sniperId}`,
    })
    const postData = await axios({
      method: 'GET',
      url: 'https://api.blockchain.com/v3/exchange/tickers/'
    }) 

    // 2) Compare Data and Update
    const preitems = [...preData.data.data.data.items];
    const postitems = [...postData.data];
    let item;
    // I could optimize performance if I know the way blockchain.com sorts bitcoins
    // TODO: sorting both of them and then matching could increase performance:) 
    for (let el of preitems) {
      item = postitems.find(i => i.symbol === el.symbol);
      if (item.price_24h !== el.price) {
        // TODO: item.price_24h > el.purchasedAt
        const status = item.price_24h > el.price? 'WINNING': 'LOSING';
        updateData(el._id, item.price_24h, status);
      }
    }
  } catch (err) {
    console.log(err);
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
