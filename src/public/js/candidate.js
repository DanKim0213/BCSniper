import axios from 'axios';
import showAlert from './alerts';

export const getUnregItems = async (regItems) => {
  try {
    const items = await axios({
      method: 'GET',
      url: 'https://api.blockchain.com/v3/exchange/tickers'
    });
    const all = items.data
      .filter(el => el.symbol.endsWith('-USD'))
      .sort((a, b) => {
        const symbolA = a.symbol;
        const symbolB = b.symbol;
        // symbol is unique
        if (symbolA < symbolB) return -1;
        else return 1;
      });
    
    let candidates = [];
    if (regItems.length === 0) candidates = all;
    for (let i = 0, j = 0; regItems.length !== 0 && i < all.length; i++) {
      if (j >= regItems.length || all[i].symbol !== regItems[j])
        candidates.push(all[i]);
      else j++;
    }

    return candidates; 
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
