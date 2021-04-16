import axios from 'axios';
import { showAlert } from './alerts';

export const getCandidate = async (symbol) => {
  try {
    const res = await axios({ 
      method: 'GET',
      url: `/api/v1/sniper/items/symbol/${symbol}`
    });

    if (res.data.data.item === null) {
      const coin = await axios({
        method: 'GET',
        url: `https://api.blockchain.com/v3/exchange/tickers/${symbol}`
      }); 

      const markup = 
      `<section class="section-cta">
        <div class="cta">
          <div>
            <img class="cta__img cta__img--logo cta__img--1" src="/img/items/${coin.data.symbol.split('-')[0]}.webp" alt="Bitcoin logo">
            <img class="cta__img cta__img--2" src="/img/logo-green-small.png" alt="">
          </div>
          <div class="cta__content">
            <h2 class="heading-secondary">
              What are you waiting for?
            </h2>
            <p class="cta__text">
              ${coin.data.symbol} only costs $${coin.data.price_24h}🤫 Make it yours today!
            </p>
            <a class="btn btn--green span-all-rows" href="/sniper/create/${coin.data.symbol}-${coin.data.price_24h}"> Buy now!
            </a>
          </div>
        </div>
      </section>`
      document.querySelector('.item-container').insertAdjacentHTML('afterbegin', markup);
    }
  } catch (err) {
    showAlert('error', 'Something went wrong while Getting candidates');    
  }
}

export const createItem = async ({symbol, duration, maxPrice, minPrice}) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/items/symbol',
      data: {
        symbol,
        duration,
        maxPrice,
        minPrice
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', `ITEM ${symbol} updated successfully!`);
      location.assign('/sniper');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}
