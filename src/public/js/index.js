import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { watchItem, sellItemNow, sellItem } from './sniper';
import { createItem } from './createItem';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const cardContainer = document.querySelector('.card-container');
const createItemForm = document.querySelector('.form--createItem');
const sellItemNowBtn = document.querySelectorAll('.sellItemNow');

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
  const purchasedAtArr = document.querySelectorAll('.itemPurchasedAt');
  const statusArr = document.querySelectorAll('.itemStatus');

  let id;
  let symbol;
  let price;
  let purchasedAt;
  let status; 

  for (let i = 0; i < idArr.length; i++) {
    id = idArr[i].innerHTML;
    symbol = symbolArr[i].innerHTML;
    price = priceArr[i].innerHTML.split('$')[1];
    purchasedAt = purchasedAtArr[i].innerHTML.split('$')[1];
    status = statusArr[i].innerHTML;
    watchItem({id, symbol, price, purchasedAt})
      .then(({nprice, nstatus}) => {
        priceArr[i].innerHTML = `$${nprice}`;
        statusArr[i].innerHTML = nstatus;
      }) // TODO: .then(() => sellItem())
      .catch(err => console.log(err));
  }
}

if (createItemForm)
  createItemForm.addEventListener('submit', e => {
    e.preventDefault();
    const symbol = document.getElementById('symbol').innerHTML;
    const price = document.getElementById('price').value;
    const duration = document.getElementById('duration').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const minPrice = document.getElementById('minPrice').value;
    createItem({symbol, price, duration, maxPrice, minPrice});
  });

if (sellItemNowBtn) 
  sellItemNowBtn.forEach(el => el.addEventListener('click', async () => {
    const cardEl = el.parentElement.parentElement;
    const symbol = cardEl.children[0].getElementsByClassName('itemSymbol')[0].innerHTML;
    const itemId = cardEl.children[1].getElementsByClassName('itemId')[0].innerHTML;
    const itemStatus = cardEl.children[1].getElementsByClassName('itemStatus')[0].innerHTML;

    const status = await sellItemNow({symbol, itemId, itemStatus});
    if (status === 'success') cardEl.remove();
  }));