/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
// const { expect } = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sniperController = require('../../src/controllers/sniperController');
const Sniper = require('../../src/models/sniperModel');

describe('Unit Test for Sniper Controller', function () {
  this.timeout(1300);

  let stub;
  afterEach('Restore the mock of Sniper Controller', () => {
    stub.reset();
  });

  it('check sniper', () => {
    // check a sniper exists
    // if there is, skip
    // if not, create a sniper
    // check the sniper is active or not

    const stub = sinon.stub(sniperController, 'createSniper');
    stub.onCall(0).returns(true).onCall(1).returns(false);

    sniperController.checkSniper();
  });

  it.skip('get sniper info', () => {});

  it.skip('update sniper', () => {});

  it.skip('Sniper lists items', () => {});
});
