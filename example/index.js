'use strict';
const jsValidations = require('../index');

const params = {
  lastName: '',
  age: undefined,
  country: null,
  email: 'tes@test'
};

const rules = {
  name: 'required',
  lastName: 'required',
  age: 'required',
  country: 'required',
  email: 'required|email'
}

console.log(jsValidations(params, rules));
