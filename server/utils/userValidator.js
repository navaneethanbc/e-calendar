import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const validateRegister = (user) => {
  const schema = Joi.object({
    fullname: Joi.string()
      .required()
      .pattern(new RegExp(/^[A-Za-z]+( [A-Za-z]+)+$/))
      .messages({ "string.pattern.base": "Please enter valid names." }),
    email: Joi.string().required().label("Email address").email().messages({
      "string.email": "Please enter a valid email address.",
      "string.empty": "Please enter a valid email address.",
    }),
    employee_id: Joi.string()
      .required()
      .label("Employee ID")
      .pattern(new RegExp(/^(ADM|MNG|EMP|TRN)[0-9]{6}$/))
      .messages({
        "string.pattern.base": "Please enter a valid employee ID.",
        "string.empty": "Please enter a valid employee ID.",
      }),
    branch: Joi.string().required().label("Branch").messages({
      "string.base": "Please select a branch.",
      "string.empty": "Please select a branch.",
    }),
    username: Joi.string()
      .pattern(/^[a-z][a-z0-9]+$/)
      .required()
      .label("Username")
      .messages({
        "string.pattern.base": "Please enter a valid username.",
        "string.empty": "Please enter a valid username.",
      }),
    password: passwordComplexity().required().label("Password").messages({
      "passwordComplexity.tooShort":
        "Password must contain atleast 8 characters.",
      "passwordComplexity.lowercase":
        "Password must contain atleast one lowercase letter.",
      "passwordComplexity.uppercase":
        "Password must contain atleast one uppercase letter.",
      "passwordComplexity.numeric": "Password must contain atleast one number.",
      "passwordComplexity.symbol": "Password must contain atleast one symbol",
      "string.empty": "Password cannot be empty.",
    }),
  });

  return schema.validate(user);
};

export const validateLogin = (user) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(user);
};
