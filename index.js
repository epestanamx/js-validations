'use strict';

module.exports = (params, rules) => {
  if(!params || !rules) {
    return null;
  }

  const validationsErrors = [];

  for (let field in rules) {
    if (rules.hasOwnProperty(field)) {
      let fieldError = {
        field: field,
        validations: []
      };

      for (let specificRule of rules[field].split('|')) {
        let error;

        if(specificRule.split(':')[0] == 'required') {
          error = required(params[field]);
        }

        if(params[field]) {
          switch (specificRule.split(':')[0]) {
            case 'accepted':
              error = accepted(params[field]);
              break;
            case 'integer':
              error = integer(params[field]);
              break;
            case 'float':
              error = float(params[field]);
              break;
            case 'array':
              error = array(params[field]);
              break;
            case 'json':
              error = json(params[field]);
              break;
            case 'email':
              error = email(params[field]);
              break;
            case 'in':
              error = inArray(params[field], specificRule.split(':')[1]);
              break;
            case 'notIn':
              error = notInArray(params[field], specificRule.split(':')[1]);
              break;
          }
        }

        if(error) {
          fieldError.validations.push(error);
        }
      }

      if(fieldError.validations.length > 0) {
        validationsErrors.push(fieldError)
      }
    }
  }

  if(validationsErrors.length > 0) {
    return validationsErrors;
  }
};

const accepted = (value) => {
  if(!(value == 1 || value == 'on' || value == 'true')) {
    return 'The field should be  (1, on, true).';
  }
};

const required = (value) => {
  if(value == null || value == undefined || value == '') {
    return `The field is required.`;
  }
};

const integer = (value) => {
  if(parseInt(value) != value) {
    return 'The field should be integer.';
  }
};

const float = (value) => {
  if(!parseFloat(value)) {
    return 'The field should be decimal.';
  }
};

const array = (value) => {
  try {
    value = JSON.parse(value);
    if(!Array.isArray(value)) {
      return 'The field should be array.';
    }
  } catch (e) {
    return 'The field should be array.';
  }
};

const json = (value) => {
  try {
    value = JSON.parse(value);
  } catch (e) {
    if(typeof value !== 'object') {
      return 'The field should be object.';
    }
  }
};

const inArray = (value, array) => {
  array = array.split(',');

  if(!array.includes(value)) {
    return `The field should be of the elements: ${array.join(', ')}`;
  }
};

const notInArray = (value, array) => {
  array = array.split(',');

  if(array.includes(value)) {
    return `The field should not be any of the following elements: ${array.join(', ')}`;
  }
};

const email = (value) => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  if(!regex.test(value)) {
    return 'The field should be a valid email.';
  }
};
