export const calculateInputUpdate = (event, showValidationError) => {
  const target = event.target
  const value =  target.value
  const validations = target.dataset.validations
  const name = target.name
  const validationName = target.dataset.label || target.dataset.validationName
  let formattedInput = target.value

  let validationError;
  if(validations){
    validations.split(',').forEach( validationKey => {
      if(validators[validationKey]){
        if(validators[validationKey].isViolated(value)){
          validationError = validators[validationKey].message(validationName)
        }
      }
    })
  }
  const result = { [name]: { value, validationError, failedValidation: !!validationError } }

  if(!showValidationError){
    result[name].validationError = undefined
  }

  return result
}

export const buildInputProps = (props, state) => {
  const defaultValue = props.defaultValue || ''
  return {
    ...props,
    defaultValue,
    value: state[props.name].value || defaultValue,
    validationError: state[props.name].validationError,
    type: props.type || 'text',
    validationName: props.validationName || props.name
  }
}

export const isSubmitButtonDisabled = (requiredFields, state) => {
  return !(allRequiredFieldsExist(requiredFields, state) && allValidationsPassing(state))
}

export const allValidationsPassing = (state) => {
  let result = true;
  Object.keys(state).forEach( key => {
    if(state[key].failedValidation){
      result = false
    }
  })

  return result
}

export const allRequiredFieldsExist = (requiredKeys, state) => {
  let result = true;
  requiredKeys.forEach( key => {
    const val = state[key].value
    if(!val || val === ''){
      result = false;
    }
  })

  return result
}

export const getValues = (state) => {
  const values = {}
  Object.keys(state).forEach( key => {
    if(state[key].value){
      values[key] = state[key].value
    }
  })

  return values;
}

export const validators = {
  required: {
    isViolated: (value) => !value || value === '',
    message: (validationName) => `${validationName} is required`
  },
  email: {
    isViolated: (value) => !value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    message: () => 'Please enter a valid email'
  },
  ccNumber: {
    isViolated: (value) => !value.match(/\d+/) || value.length < 13 || value.length > 19,
    message: () => 'Please enter a valid credit card number'
  },
  exp: {
    isViolated: (value) => !value.match(/^\d{1,2}\s*\/\s*\d{2}$/),
    message: () => 'Please enter a valid expiration date'
  },
  cvv: {
    isViolated: (value) => !value.match(/^[0-9]{3,4}$/),
    message: () => 'Please enter a valid cvc'
  },
  zip: {
    isViolated: (value) => !value.match(/^\d{5}(?:[-\s]\d{4})?$/),
    message: () => 'Please enter a valid US zip'
  },
  phone: {
    isViolated: (value) => !value.match(/^[(]?[0-9]{3}[)]?[\s]?[0-9]{3}?\s?[-]?\s?[0-9]{4,6}$/im),
    message: () => 'Please enter a valid phone number'
  },
  password: {
    isViolated: (value) => {
      if(value.length < 6){
        return true;
      } else if(!value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
        return true;
      } else if(!value.match(/\d/)){
        return true;
      }
      return false
    },
    message: () => 'Passwords must be longer than 6 characters, contain a number, and a special character'
  },
  number: {
    isViolated: (value) => isNaN(value),
    message: () => 'Must be a number'
  }

}
