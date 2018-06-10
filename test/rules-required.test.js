'use strict';
const assert = require('chai').assert;
const jsValidations = require('../index');

describe('Required rule', () => {
  it('jsValidations should return undefined', () => {
    const params = {};
    const rules = {};

    assert.equal(jsValidations(params, rules), undefined, 'The jsValidations is not undefined.');
  });

  it('jsValidations should return two field errors.', () => {
    const params = {
      name: null,
      lastName: '',
    };

    const rules = {
      name: 'required',
      lastName: 'required'
    };

    assert.equal(jsValidations(params, rules).length, 2, 'The jsValidations not return two field errors.');
  });

  it('jsValidator return one field error with only one error', () => {
    const params = {};

    const rules = {
      name: 'required'
    };

    assert.equal(jsValidations(params, rules).length, 1, 'The jsValidations not return one field errors.');
    assert.equal(jsValidations(params, rules)[0].validations.length, 1, 'The jsValidations not return only one error.');
  });
});
