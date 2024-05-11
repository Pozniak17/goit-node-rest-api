import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

//! тут всі маршрути, що стосуються книг

const contactsRouter = express.Router();

//* коментуємо
contactsRouter.get("/", getAllContacts);

// contactsRouter.get("/:id", getOneContact);

// contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContact);

// contactsRouter.put("/:id", updateContact);

export default contactsRouter;
