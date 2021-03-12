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

  it('Sniper joins until closed', () => {});

  it('Sniper makes a higher bid but loses', () => {});

  it('Sniper wins an bitcoin by bidding higher', () => {});

  it('Sniper sells an bitcoin when the price meets the upper bound', () => {});

  it('Sniper sells an bitcoin when the price meets the lower bound', () => {});

  it('sniper bids for multiple items', () => {});

  it('Sniper loses an bitcoin when the price is too high', () => {});

  it('Sniper stops when error occurred', () => {});
});
