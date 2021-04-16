import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { watchItem, sellItemNow, sellItem } from './sniper';
import { getCandidate, createItem } from './candidate';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const cards = document.querySelectorAll('.card');
const createItemForm = document.querySelector('.form--createItem');
const sellItemNowBtn = document.querySelectorAll('.sellItemNow');
const itemContainer = document.querySelector('.item-container');

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    // without await vs with await: async fn is Promise 
    // and the reason why Promise is used is that we need the expected order.
    // For example, to reassign like below or assign values from the promise.
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

// TODO: update profit on view
if (cards) {
  cards.forEach(el => {
    const idEl = el.querySelector('.itemId');
    const symbolEl = el.querySelector('.itemSymbol');
    const priceEl = el.querySelector('.itemPrice');
    const statusEl = el.querySelector('.itemStatus');
    const maxEl = el.querySelector('.max');
    const minEl = el.querySelector('.min');
    const durEl = el.querySelector('.itemDuration');
    
    watchItem({id: idEl.innerHTML, symbol: symbolEl.innerHTML})
      .then((data) => {
        const price = data.item.price;
        priceEl.innerHTML = `$${price}`;
        statusEl.innerHTML = data.status;
        return { price, symbol: data.item.symbol };
      })
      .then(({ price, symbol }) => {
        const max = maxEl.innerHTML.split('$')[1];
        const min = minEl.innerHTML.split('$')[1];
        const dur = durEl.innerHTML;
        return sellItem({price, symbol, max, min, dur});
      })
      .then(res => {
        if (res === 'success') 
          el.parentElement.removeChild(el);
      })
      .catch(err => console.log(err));
  });
}

if (createItemForm)
  createItemForm.addEventListener('submit', e => {
    e.preventDefault();
    const symbol = document.getElementById('symbol').innerHTML;
    const duration = document.getElementById('duration').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const minPrice = document.getElementById('minPrice').value;
    createItem({symbol, duration, maxPrice, minPrice});
  });

if (sellItemNowBtn) 
  sellItemNowBtn.forEach(el => el.addEventListener('click', async e => {
    e.preventDefault();
    const cardEl = el.parentElement.parentElement;
    const symbol = cardEl.querySelector('.itemSymbol').innerHTML;
    const res = await sellItemNow({symbol});
    if (res === 'success') cardEl.remove();
  }));

if (itemContainer) {
  const all = [
    'AAVE-USD', 'ALGO-USD', 'DGLD-USD', 'DOT-USD', 'LEND-USD', 
    'LTC-USD', 'OGN-USD', 'PAX-USD', 'USDT-USD', 'XLM-USD', 'XRP-USD', 
    'YFI-USD', 'BTC-USD', 'ETH-USD', 'BCH-USD'
  ];
  all.forEach(el => {
    getCandidate(el);
  });
}