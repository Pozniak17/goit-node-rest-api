import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const { error } = createContactSchema.validate({ name, email, phone });
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = updateContactSchema.validate({ name, email, phone });
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await contactsService.rewriteContact(id, req.body);

    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }

  // const { id } = req.params;
  // const { name, email, phone } = req.body;
  // const { error } = updateContactSchema.validate({ name, email, phone });

  // if (Object.keys(req.body).length === 0) {
  //   return res
  //     .status(400)
  //     .json({ message: "Body must have at least one field" });
  // }
  // if (error) {
  //   return res.status(400).json({ message: error.message });
  // }

  // try {
  //   const result = await contactsService.rewriteContact(id, req.body);
  //   if (!result) {
  //     return res.status(404).json({ message: "Not found" });
  //   }

  //   res.status(200).json(result);
  // } catch (error) {
  //   next(error);
  // }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
