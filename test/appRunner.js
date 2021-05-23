/* eslint-disable node/no-unpublished-require */
const { expect } = require('chai');
const puppeteer = require('puppeteer');
// const sinon = require('sinon'); // to intercept bitcoint data

let browser;
let page;

exports.isLaunchedAndGoToHome = async () => {
  // browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('http://localhost:3000');
};

exports.isClosed = async () => {
  await browser.close();
};

exports.openLoginForm = async () => {
  await page.$eval('#login', btn => btn.click());
  await page.waitForSelector('.login-form', { timeout: 5000 });

  const loginStr = await page.$eval(
    '.login-form',
    e => e.querySelector('h2').innerHTML
  );
  expect(loginStr).to.be.equal('Log into your account');
};

exports.clickGiveAShot = async () => {
  await page.$eval('a.btn.btn--green.span-all-rows', btn => btn.click());
  await page.waitForSelector('.login-form', { timeout: 5000 });

  const loginStr = await page.$eval(
    '.login-form',
    e => e.querySelector('h2').innerHTML
  );
  expect(loginStr).to.be.equal('Log into your account');
};

exports.sniperIsLoggedIn = async () => {
  await page.$eval('#login', btn => btn.click());
  await page.waitForSelector('.login-form', { timeout: 5000 });

  await page.type('#email', 'newhacker@hacker.com');
  await page.type('#password', 'pass1234');
  await page.$eval('button', btn => btn.click());

  await page.waitForSelector('a.nav__el.nav__el--logout'); // wait for login

  const logout = await page.$eval(
    'a.nav__el.nav__el--logout',
    e => e.innerHTML
  );
  expect(logout).to.be.equal('Log out');
};

// TODO: lt(0)
exports.clickShootNow = async () => {
  await page.$eval('#home', btn => btn.click());
  await page.$eval('button.btn.btn--green.span-all-rows', btn => btn.click());
  await page.waitForSelector('.item-container', { timeout: 5000 });

  const cntLen = await page.$eval(
    '.item-container',
    e => e.querySelectorAll('.section-cta').length
  );
  expect(cntLen).to.be.lte(0);
};

// symbol required
exports.sniperBuysAnItem = async done => {
  await page.$eval('#bitcoins', btn => btn.click());
  await page.waitForTimeout(2000);
  // DGLD-USD
  const sth = await page.$$eval('.cta__text', arr => arr.map(e => e.innerHTML));
  console.log(sth);
  // const itemCtn = await page.$$eval('p.cta__text', arr => {
  //   const item = arr.filter(e => e.innerHTML.includes('DGLD-USD'))[0];
  //   console.log(item);
  //   return item.parentElement;
  // });
  // await page.$eval('a', () => itemCtn.click());

  // const status = await page.$eval('.alert', e => e.innerHTML);
  // expect(status).to.be.equal('success');
  done();
};

exports.sniperSellsAnItem = async () => {};

exports.sniperLostMoney = async () => {};
