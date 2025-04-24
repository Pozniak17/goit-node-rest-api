import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

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

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
