import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

import Contact from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// export const getOneContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactsService.getContactById(id);
//     if (!result) {
//       throw HttpError(404);
//     }

//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createContact = async (req, res, next) => {
//   const { name, email, phone } = req.body;
//   try {
//     const { error } = createContactSchema.validate({ name, email, phone });
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const result = await Contact.create(name, email, phone);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateContact = async (req, res, next) => {
//   const { name, email, phone } = req.body;
//   const { error } = updateContactSchema.validate({ name, email, phone });
//   try {
//     if (error) {
//       throw HttpError(400, error.message);
//     }

//     const { id } = req.params;
//     const result = await contactsService.rewriteContact(id, req.body);

//     if (!result) {
//       throw HttpError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactsService.removeContact(id);
//     if (!result) {
//       throw HttpError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };
