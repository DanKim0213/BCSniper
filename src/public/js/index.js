import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { watchItem } from './sniper';
import { getUnregItems } from './candidate';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const cardContainer = document.querySelector('.card-container');
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
  const purchasedAtArr = document.querySelectorAll('.itemPurchasedAt');
  const statusArr = document.querySelectorAll('.itemStatus');

  let id;
  let symbol;
  let price;
  let purchasedAt;
  let status; 

  console.log(Date.now());
  for (let i = 0; i < idArr.length; i++) {
    id = idArr[i].innerHTML;
    symbol = symbolArr[i].innerHTML;
    price = priceArr[i].innerHTML.split('$')[1];
    purchasedAt = purchasedAtArr[i].innerHTML.split('$')[1];
    status = statusArr[i].innerHTML;
    const { nprice, nstatus } = watchItem({id, symbol, price, purchasedAt});

    price = nprice;
    status = nstatus;
  }
}

if (itemContainer) {
  // 1) figure out unregItems
  const regItemArr = document.querySelectorAll('.regItem');
  let regItems = [];
  for (let el of regItemArr) {
    regItems.push(el.innerHTML);
  }
  getUnregItems(regItems).then(candidates => {
    for (let candidate of candidates) {
      // 2) create new element  
      const tag = document.createElement('p');
      const txt = document.createTextNode(candidate.symbol);
      tag.appendChild(txt);
    
      // 3) append the element
      itemContainer.appendChild(tag);
    }
  });
} 
