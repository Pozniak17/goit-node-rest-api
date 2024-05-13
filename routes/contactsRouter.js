import express from "express";
// import isValidId from "../controllers/middlewares/isValidId.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

//! тут всі маршрути, що стосуються книг

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(createContactSchema), updateContact);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateContactSchema),
  updateStatusContact
);

export default contactsRouter;
