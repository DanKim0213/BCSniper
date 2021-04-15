import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { watchItem, sellItemNow, sellItem } from './sniper';
import { getCandidate } from './candidate';
import { createItem } from './createItem';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const cardContainer = document.querySelector('.card-container');
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

if (cardContainer) {
  const idArr = document.querySelectorAll('.itemId');
  const symbolArr = document.querySelectorAll('.itemSymbol');
  const priceArr = document.querySelectorAll('.itemPrice');
  const statusArr = document.querySelectorAll('.itemStatus');

  let id;
  let symbol;

  for (let i = 0; i < idArr.length; i++) {
    id = idArr[i].innerHTML;
    symbol = symbolArr[i].innerHTML;
    watchItem({id, symbol})
      .then((data) => {
        priceArr[i].innerHTML = `$${data.data.item.price}`;
        statusArr[i].innerHTML = data.data.status;
      }) // TODO: .then(() => sellItem())
      .catch(err => console.log(err));
  }
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