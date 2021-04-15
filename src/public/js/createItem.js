import axios from 'axios';
import { showAlert } from './alerts';

export const createItem = async (item) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/items/symbol',
      data: {
        symbol: item.symbol,
        duration: item.duration,
        maxPrice: item.maxPrice,
        minPrice: item.minPrice
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', `ITEM ${item.symbol} updated successfully!`);
      location.assign('/sniper');
    }
    
  } catch (err) {
    console.log(err.message);
    showAlert('error', 'Uh-oh Something went wrong!!! Please check validation or the item available'); 
  }
}