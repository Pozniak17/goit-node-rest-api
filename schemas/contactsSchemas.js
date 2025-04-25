import Joi from "joi";

// {name, email, phone}

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(5).max(20),
  email: Joi.string().required().min(5),
  phone: Joi.string().required().min(5),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(5).max(20),
  email: Joi.string().min(5),
  phone: Joi.string().min(5),
});
