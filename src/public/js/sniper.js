import axios from 'axios';
import { showAlert } from './alerts';

export const watchItem = async ({id, symbol}) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/items/watch/${id}`,
      data: { symbol }
    });
    
    console.log(`${symbol} updated successfully`);
    return res.data.data;
  } catch (err) {
    showAlert('error', 'Please wait a little bit longer');
  }
}

export const sellItemNow = async ({symbol}) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/sniper/items/symbol/${symbol}`
    });

    if (res.data.status === 'success') {
      showAlert('success', `${symbol} item sold: YOU ${res.data.data.status}!`);
      return 'success';
    }

  } catch (err) {
    showAlert('error', 'Something went wrong while Selling Item');
  }
};

export const sellItem = async ({price, symbol, max, min, dur}) => {
  try {
    const today = new Date(Date.now())
      .toLocaleString('ko-KR', {month: 'long', day: 'numeric', year: 'numeric'});
    if (price >= max || price <= min || today >= dur) 
      return sellItemNow({symbol});
  } catch (err) {
    showAlert('error', err.message); 
  }
}
