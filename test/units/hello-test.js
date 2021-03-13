/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const { expect } = require('chai');

describe('Test Hello World', () => {
  it('sanity', () => {
    const hello = 'Hello World!';
    expect(hello).to.be.equal('Hello World!');
  });
});
