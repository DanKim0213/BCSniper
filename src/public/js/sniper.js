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
    return res.data;
  } catch (err) {
    // showAlert('error', 'Please wait a little bit longer!!!');
    console.log('Please wait a little bit longer...');
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

// TODO: sellItem based on Duration, minPrice, and maxPrice
export const sellItem = async () => {
  try {
    
  } catch (err) {
    showAlert('error', err.message); 
  }
}
