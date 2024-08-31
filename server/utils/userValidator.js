import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().required().label("Username"),
    password: passwordComplexity().required().label("Password"),
    email: Joi.string().email().required().label("Email address"),
    fullname: Joi.string()
      .required()
      .label("Name")
      .pattern(new RegExp("^[A-Za-z]+( [A-Za-z]+)+$")),
    employee_id: Joi.string().alphanum().required().label("Employee ID"),
    branch: Joi.string().required().label("Branch"),
  });

  return schema.validate(user);
};
