import axios from 'axios';
import { showAlert } from './alerts';

export const registerSniper = async (money) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/sniper/me',
      data: {
        money 
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Registered a sniper successfully!');
      window.setTimeout(() => {
        location.assign('/sniper');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Something went wrong!!! Try again'); 
  }
}