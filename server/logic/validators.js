const required = (value) => {
  if (!value) return "Field is required";
};

const requiredTrim = (value) => {
  if (value.trim() === "") return "Field is required";
};

const noSpacesStartEnd = (value) => {
  if (value.trim() && value.length > value.trim().length) {
    return "Field cant start or end with space";
  }
};

const spaceBetween = (value) => {
  value = value.trim();
  if (value && value.replace(" ", "").length !== value.length) {
    return "No space can be used inside this field";
  }
};

const lettersAndNumbers = (value) => {
  if (!value.trim().match("^[A-Za-z0-9_*.!, ]*$")) {
    return "Use only english letters, numbers or '_' ',' '.' symbols";
  }
};

const maxLengthValidatorCreator = (maxLength) => (value) => {
  if (value.trim().length > maxLength) {
    return `Max length is ${maxLength} symbols`;
  } else return;
};

const minLengthValidatorCreator = (minLength) => (value) => {
  if (value && value.trim().length < minLength) {
    return `Min length is ${minLength} symbols`;
  }
};

const validationCreator = (arrayFun) => (value, secondValue) => {
  for (const item of arrayFun) {
    if (item(value, secondValue)) {
      return item(value, secondValue);
    }
  }
};

const validateUserName = validationCreator([
  required,
  requiredTrim,
  spaceBetween,
  lettersAndNumbers,
  minLengthValidatorCreator(3),
  maxLengthValidatorCreator(30),
]);

const validatePassword = validationCreator([
  required,
  requiredTrim,
  noSpacesStartEnd,
  lettersAndNumbers,
  minLengthValidatorCreator(3),
  maxLengthValidatorCreator(30),
]);

const simpleValidateNames = validationCreator([
  required,
  requiredTrim,
  lettersAndNumbers,
  minLengthValidatorCreator(2),
  maxLengthValidatorCreator(30),
]);

const validateRegister = (user) => {
  if (validateUserName(user.userName)) {
    return validateUserName(user.userName);
  }
  if (validatePassword(user.password)) {
    return validatePassword(user.password);
  }
  if (simpleValidateNames(user.firstName)) {
    return "first name is not valid";
  }
  if (simpleValidateNames(user.lastName)) {
    return "last name is not valid";
  }
  return null;
};

module.exports = { validateRegister };
