'use strict';
const assert = require('chai').assert;
const jsValidations = require('../index');

describe('jsValidations', () => {
  it('jsValidations should not be undefined', () => {
    assert.notEqual(jsValidations, undefined, 'The jsValidations is undefined.');
  });

  it('jsValidations should be a function', () => {
    assert.equal(typeof jsValidations, 'function', 'The jsValidations is not a function.');
  });

  it('jsValidations should return null', () => {
    assert.equal(jsValidations(null, undefined), null, 'The jsValidations did not return null.');
  });

  it('jsValidations should return undefined', () => {
    assert.equal(jsValidations({}, {}), undefined, 'The jsValidations did not return undefined.')
  });
});
