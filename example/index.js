'use strict';
const jsValidations = require('../index');

const params = {
  lastName: '',
  age: undefined,
  country: null
};

const rules = {
  name: 'required',
  lastName: 'required',
  age: 'required',
  country: 'required'
}

console.log(jsValidations(params, rules));
