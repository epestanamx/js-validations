# js-validations
Library for parameter validation inspired by Laravel.

## Install
$ npm install js-validations

## Usage

``` js
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

```

### Output

```
[
  {
    field: 'name',
    validations: ['The field is required.']
  },
  {
    field: 'lastName',
    validations: ['The field is required.']
  },
  {
    field: 'age',
    validations: ['The field is required.']
  },
  {
    field: 'country',
    validations: ['The field is required.']
  }
]
```

## Available Validation Rules
Below is a list of all available validation rules and their function:
- Required

### Required
The field under validation must be present in the input data and not empty. A field is considered "empty" if one of the following conditions are true:
- The value is null.
- The value is undefined.
- The value is an empty string.
