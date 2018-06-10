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
          case 'required':
            error = required(params[field]);
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

const required = (value) => {
  if(value == null || value == undefined || value == '') {
    return `The field is required.`;
  }
};
