import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavoriteContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";

import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();
const jsonParser = express.json();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post(
  "/",
  jsonParser,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  jsonParser,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateFavoriteContactSchema),
  updateFavoriteContact
);

export default contactsRouter;
