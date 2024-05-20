import Contact from "../models/contact.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  console.log({ user: req.user });

  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);

    if (contact === null) {
      throw HttpError(404, "Contact not found");
    }

    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Contact.findByIdAndDelete(id);

    if (result === null) {
      throw HttpError(404, "Contact not found");
    }

    res.send({ id });
  } catch (error) {
    next(error);
  }
};

export async function createContact(req, res, next) {
  try {
    const contact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      owner: req.user.id,
    };
    const newContact = await Contact.create(contact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

export const updateContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (result === null) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateFavoriteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (result === null) throw HttpError(404, "Contact not found");

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
