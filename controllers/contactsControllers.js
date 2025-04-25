import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res) => {
  const data = await contactsService.listContacts();
  res.send(data);
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await contactsService.getContactById(id);

    if (!data) {
      throw HttpError(404);
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await contactsService.removeContact(id);

    if (!data) {
      throw HttpError(404);
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const { error, value } = createContactSchema.validate(newData);

  try {
    const contact = await contactsService.addContact(value);
    if (error) {
      res.status(400).json({ message: error.message });
    }

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;

  const updatedData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const { error, value } = updateContactSchema.validate(updatedData);

  try {
    const contact = await contactsService.updateContact(id, value);
    // помилка при не проходженні валідації
    if (error) {
      res.status(400).json({ message: error.message });
    }

    if (!contact) {
      throw HttpError(404);
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};
