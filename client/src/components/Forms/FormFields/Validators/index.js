export function minLength (min) {
  return function (value) {
    return value.length < min ? 
      `Value must be at least ${min} characters` 
      : null;
  }
}

export function maxLength (max) {
  return function (value) {
    return value.length > max ?
      `Value must be at less than ${max} characters` 
        : null;
  }
}

export function isEmail() {
  const re = /\S+@\S+\.\S+/;
  return function (input) {
    return re.test(input)
      ? null
      : "Must be a valid email address"
  };
}

export function isRequired() {
  return function (input) {
    const isMissing = typeof input == 'string' && input == "" || 
                      typeof input == "number" && isNaN(input) || 
                      Array.isArray(input) && input.length == 0

    return isMissing ? "Value for this field is required" : null
  }
}