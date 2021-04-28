/* eslint-disable */
const { expect } = require('chai');
const puppeteer = require('puppeteer');

describe.skip('End to End Testing1', function () {
  this.timeout(5000);
  let browser;
  let page;
  
  beforeEach('Set up', async () => {
    // browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  });

  afterEach('Close browser', async () => {
    await page.close();
    await browser.close();
  });

  it('click the login button', async () => {
    await page.$eval('#login', btn => btn.click());
    await page.waitForSelector('.login-form', { timeout: 5000 });

    const loginStr = await page.$eval('.login-form', e => e.querySelector('h2').innerHTML);
    expect(loginStr).to.be.equal('Log into your account');
  });

  it('click "give a shot" button', async () => {
    await page.$eval('a.btn.btn--green.span-all-rows', btn => btn.click());
    await page.waitForSelector('.login-form', { timeout: 5000 });

    const loginStr = await page.$eval('.login-form', e => e.querySelector('h2').innerHTML);
    expect(loginStr).to.be.equal('Log into your account');
  });
});

describe('End to End testing2', () => {
  let browser;
  let page;

  beforeEach('Set up', async function () {
    // browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.$eval('#login', btn => btn.click());
    await page.waitForSelector('.login-form', { timeout: 5000 });

    await page.type('#email', 'newhacker@hacker.com');
    await page.type('#password', 'pass1234');
    await page.$eval('button', btn => btn.click());
  });

  afterEach('Close browser', async () => {
    await browser.close();
  });

  it('Sniper is logged in', async function () {
    this.timeout(10000); // Alerting 'success' takes over 2000 ms
    await page.waitForSelector('a.nav__el.nav__el--logout'); // wait for login 
    
    const logout = await page.$eval('a.nav__el.nav__el--logout', e => e.innerHTML);
    expect(logout).to.be.equal('Log out'); 
  });

  it('click "shoot now" button', async function () {
    this.timeout(10000);
    await page.waitForSelector('a.nav__el.nav__el--logout');
    await page.$eval('#home', btn => btn.click());
    await page.$eval('button.btn.btn--green.span-all-rows', btn => btn.click());
    await page.waitForSelector('.item-container', { timeout: 5000 });

    const cntLen = await page.$eval('.item-container', e => e.querySelectorAll('.section-cta').length);
    console.log(cntLen); expect(cntLen).to.be.lte(0);
  });

  it.skip('Sniper buys an item and sells the item immediately', () => {});

  it.skip('Sniper buys an item and sells the item when won', () => {});

  it.skip('Sniper buys an item and sells the item when lost', () => {});

  it.skip('Sniper buys an item and sells the item when due to the date', () => {});

  it.skip('sniper buys multiple items', () => {});

  it.skip('Sniper cannot buy an item when the price is too high', () => {});

  it.skip('Sniper stops when error occurred', () => {});
});
