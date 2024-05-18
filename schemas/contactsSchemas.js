import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().required().email(),
  phone: Joi.string().required().min(12),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().min(12),
})
  .min(1)
  .message("Body must have at least one field");

export const updateFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
