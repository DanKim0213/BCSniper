/* eslint-disable */
const { expect } = require('chai'); 
const puppeteer = require('puppeteer'); 
// sinonjs is required to intercept bitcoint data

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
}

exports.openLoginForm = async () => {
    await page.$eval('#login', btn => btn.click());
    await page.waitForSelector('.login-form', { timeout: 5000 });

    const loginStr = await page.$eval('.login-form', e => e.querySelector('h2').innerHTML);
    expect(loginStr).to.be.equal('Log into your account');
}

exports.clickGiveAShot = async () => {
    await page.$eval('a.btn.btn--green.span-all-rows', btn => btn.click());
    await page.waitForSelector('.login-form', { timeout: 5000 });

    const loginStr = await page.$eval('.login-form', e => e.querySelector('h2').innerHTML);
    expect(loginStr).to.be.equal('Log into your account');
}

exports.sniperIsLoggedIn = async () => {
  await page.$eval('#login', btn => btn.click());
  await page.waitForSelector('.login-form', { timeout: 5000 });

  await page.type('#email', 'newhacker@hacker.com');
  await page.type('#password', 'pass1234');
  await page.$eval('button', btn => btn.click());

  await page.waitForSelector('a.nav__el.nav__el--logout'); // wait for login 
  
  const logout = await page.$eval('a.nav__el.nav__el--logout', e => e.innerHTML);
  expect(logout).to.be.equal('Log out'); 
}

exports.clickShootNow = async () => {
  await page.$eval('#home', btn => btn.click());
  await page.$eval('button.btn.btn--green.span-all-rows', btn => btn.click());
  await page.waitForSelector('.item-container', { timeout: 5000 });

  const cntLen = await page.$eval('.item-container', e => e.querySelectorAll('.section-cta').length);
  expect(cntLen).to.be.lte(0);
}
