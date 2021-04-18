import axios from "axios";
import { showAlert } from './alerts';

export const viewSniper = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/sniper/me'
    });

    console.log(`money: ${res.data.data.data.money}`);
    showAlert('info', `money: ${res.data.data.data.money}`);
  } catch (err) {
    showAlert('error', err.response.data.message); 
  }
};

export const viewLog = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/sniper/me'
    });

    const logarr = res.data.data.data.logs;
    let msg;
    if (logarr.length > 3)
      msg = logarr
        .slice(logarr.length-3)
        .map(el => 
          `${el.trade} ${el.symbol} at $${el.price} on ${new Date(el.date).toLocaleString('en-us', {month: 'short', day: 'numeric'})}<br>`
        ).join('\n');
    else
      msg = logarr
        .map(el => 
          `${el.trade} ${el.symbol} at $${el.price} on ${new Date(el.date).toLocaleString('en-us', {month: 'short', day: 'numeric'})}<br>`
        ).join('\n');

    console.log(msg);
    showAlert('info', `${msg}`);
  } catch (err) {
    showAlert('error', err.response.data.message); 
  }
};