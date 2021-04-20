import '@babel/polyfill';
import { viewSniper, viewLog } from './alertInfo';
import { signup } from './signup';
import { login, logout } from './login';
import { registerSniper } from './register';
import { updateSettings } from './updateSettings';
import { watchItem, sellItemNow, sellItem } from './sniper';
import { getCandidate, createItem } from './candidate';

// DOM ELEMENTS
const viewSniperBtn = document.getElementById('viewSniper');
const viewLogBtn = document.getElementById('viewLog');
const signupForm = document.querySelector('.form--signup');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const registerForm = document.querySelector('.form--register');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const cards = document.querySelectorAll('.card');
const createItemForm = document.querySelector('.form--createItem');
const sellItemNowBtn = document.querySelectorAll('.sellItemNow');
const itemContainer = document.querySelector('.item-container');

if (viewSniperBtn) 
  viewSniperBtn.addEventListener('click', e => {
    e.preventDefault();
    viewSniper();
  });

if (viewLogBtn) 
  viewLogBtn.addEventListener('click', e => {
    e.preventDefault();
    viewLog();
  });

if (signupForm) 
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (registerForm) 
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const money = document.getElementById('money').value;
    registerSniper(money);
  });

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (cards) {
  cards.forEach(el => {
    const idEl = el.querySelector('.itemId');
    const symbolEl = el.querySelector('.itemSymbol');
    const priceEl = el.querySelector('.itemPrice');
    const profitEl = el.querySelector('.itemProfit');
    const statusEl = el.querySelector('.itemStatus');
    const maxEl = el.querySelector('.max');
    const minEl = el.querySelector('.min');
    const durEl = el.querySelector('.itemDuration');
    
    watchItem({id: idEl.innerHTML, symbol: symbolEl.innerHTML})
      .then((data) => {
        priceEl.innerHTML = `$${data.item.price}`;
        profitEl.innerHTML = `The profit is $${((data.item.price - data.item.purchasedAt) * 1).toFixed(2)}`
        statusEl.innerHTML = data.status;
        return { price: data.item.price, symbol: data.item.symbol };
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