/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
// const { expect } = require('chai');
const sinon = require('sinon');
const sniperController = require('../../src/controllers/sniperController');

describe('Unit Test for Sniper Controller', () => {
  let mock;
  before('Set before', () => {
    mock = sinon.mock(sniperController);
  });
  afterEach('Restore the mock of Sniper Controller', () => {
    mock.restore();
  });

  it('Sniper is active', () => {
    // const expectation = mock.expects('getAllSniperInfo').once();
    // expectation.verify();
  });

  it('Sniper shows money', () => {});

  it('Sniper lists items', () => {});
});
