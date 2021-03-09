/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const { expect } = require('chai');
const puppeteer = require('puppeteer');

describe('End to End testing', () => {
  let browser;
  let page;

  before('Set up ', async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  after('Close browser', async () => {
    await page.close();
    await browser.close();
  });

  it('open brower and check "Hello World"', async () => {
    await page.goto('http://localhost:3000/sniper');
    const content = await page.evaluate(() => {
      const title = document.querySelector('#hello').innerHTML;
      return title;
    });
    // console.log(content);
    expect(content).to.equal('Hello World!');
  });
});
