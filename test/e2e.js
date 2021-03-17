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

  it.skip('open brower and check "Hello World"', async () => {
    await page.goto('http://localhost:3000/sniper');
    const content = await page.evaluate(() => {
      const title = document.querySelector('#hello').innerHTML;
      return title;
    });
    // console.log(content);
    expect(content).to.equal('Hello World!');
  });

  it('Sniper is idle', async () => {
    // Test inactive
    // 1) doesn't buy anything
  });

  it('Sniper is active until it sells all items', async () => {
    // Test active and inactive
    // 1) buy an Item
    // 2) Lost the Item
  });

  it('Sniper is bidding and loses', () => {});

  it('Sniper is winning but loses', () => {});

  it('Sniper wins an bitcoin', () => {});

  it('sniper bids for multiple items', () => {});

  it('Sniper stops when error occurred', () => {});
});
