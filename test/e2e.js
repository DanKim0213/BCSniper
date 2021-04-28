/* eslint-disable */
const app = require('./appRunner');

describe.skip('End to End Testing1', function () {
  this.timeout(5000);
  
  beforeEach('Set up', async () => {
    await app.isLaunchedAndGoToHome();
  });

  afterEach('Close browser', async () => {
    await app.isClosed();
  });

  it('click the login button', async () => {
    await app.openLoginForm();
  });

  it('click "give a shot" button', async () => {
    await app.ClickGiveAShot();
  });
});

describe('End to End testing2', function () {
  this.timeout(5000);

  beforeEach('Set up', async () => {
    await app.isLaunchedAndGoToHome();
    await app.openLoginForm();
  });

  afterEach('Close browser', async () => {
    await app.isClosed();
  });

  it('Sniper is logged in', async function () {
    await app.sniperIsLoggedIn();
  });

  it('click "shoot now" button', async function () {
    await app.sniperIsLoggedIn();
    await app.clickShootNow();
  });

  it.skip('Sniper buys an item and sells the item immediately', () => {
    /*
    sniperIsLoggedIn(); // check
    sniperBuysAnItem(); // action
    sniperSellsAnItem(); // action
    sniperLostMoney(); // check
    */
  });

  it.skip('Sniper buys an item and sells the item when won', () => {
    /*
    sniperIsLoggedIn(); // check
    sniperBuysAnItem(); // action
    priceBecomesExpensive(); // action
    itemIsWinning(); // check
    sniperSellsAnItem(); // action
    sniperWonMoney(); // check
    */
  });

  it.skip('Sniper buys an item and sells the item when lost', () => {
    /*
    sniperIsLoggedIn();
    sniperBuysAnItem();
    priceBecomesCheap();
    itemIsLosing(); 
    sniperSellsAnItem();
    sniperLostMoney();
    */
  });

  it.skip('Sniper buys an item and sells the item when due to the date', () => {
    /*
    sniperIsLoggedIn();
    sniperBuysAnItem();
    priceBecomesCheap();
    itemIsLosing(); 
    itemIsDue();
    sniperSoldAnItem();
    sniperLostMoney();
    */
  });

  it.skip('Sniper buys an item and sells the item when the item meets the max', () => {
    /*
    sniperIsLoggedIn();
    sniperBuysAnItem();
    priceBecomesExpensive(); // max
    itemIsWinning(); 
    sniperSoldAnItem();
    sniperLostMoney();
    */
  });

  it.skip('Sniper buys an item and sells the item when the item meets the min', () => {
    /*
    sniperIsLoggedIn();
    sniperBuysAnItem();
    priceBecomesCheap(); // min
    itemIsLosing(); 
    sniperSoldAnItem();
    sniperLostMoney();
    */
  });

  it.skip('sniper buys multiple items', () => {});

  it.skip('Sniper cannot buy an item when the price is too high', () => {});

  it.skip('Sniper stops when error occurred', () => {});
});
