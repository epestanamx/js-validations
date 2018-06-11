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

        switch (specificRule.split(':')[0]) {
          case 'accepted':
            error = accepted(params[field]);
            break;
          case 'required':
            error = required(params[field]);
            break;
          case 'number':
            error = number(params[field]);
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
    return 'El campo debería ser (1, on, true).';
  }
};

const required = (value) => {
  if(value == null || value == undefined || value == '') {
    return `The field is required.`;
  }
};

const number = (value) => {
  if(!parseInt(value)) {
    return 'El campo debería ser númerico.';
  }
};

const float = (value) => {
  if(!parseFloat(value)) {
    return 'El campo debería ser númerico.';
  }
};

const array = (value) => {
  try {
    value = JSON.parse(value);
    if(!Array.isArray(value)) {
      return 'El campo debería ser un array.';
    }
  } catch (e) {
    return 'El campo debería ser un array.';
  }
};

const json = (value) => {
  try {
    value = JSON.parse(value);
  } catch (e) {
    if(typeof value !== 'object') {
      return 'El campo debería ser un objecto.';
    }
  }
};

const inArray = (value, array) => {
  array = array.split(',');

  if(!array.includes(value)) {
    return `El campo debería ser alguno de los siguientes elementos: ${array.join(', ')}`;
  }
};

const notInArray = (value, array) => {
  array = array.split(',');

  if(array.includes(value)) {
    return `El campo no debería ser ninguno de los siguientes elementos: ${array.join(', ')}`;
  }
};

const email = (value) => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  if(!regex.test(value)) {
    return 'El campo debería ser de tipo email.';
  }
};
