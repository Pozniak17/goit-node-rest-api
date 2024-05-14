import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string().min(1),
})
  .min(1)
  .message("Body must have at least one field");

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
