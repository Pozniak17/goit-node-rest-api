import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
// import HttpError from "../helpers/HttpError";

const contactsPath = path.resolve("db", "contacts.json");
// console.log(contactsPath);

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(data);
}

async function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (typeof contact === "undefined") {
    return null;
  }

  return contact;
}

// getContactById("e6ywwRe4jcqxXfCZOj_1e").then((data) => console.log(data));

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.

  const contacts = await readContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const deleteContact = contacts[index];

  //* метод 1 без мутації
  // const newContacts = [
  //   ...contacts.slice(0, index),
  //   ...contacts.slice(index + 1),
  // ];

  // await writeContacts(newContacts);

  //* метод 2 з мутацією
  contacts.splice(index, 1);

  await writeContacts(contacts);

  return deleteContact;
}

async function addContact(contact) {
  //name, email, phone
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const contacts = await readContacts();

  const newContact = { id: crypto.randomUUID(), ...contact };

  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact;
}

// addContact({
//   name: "Adolf",
//   email: "adolf@gmail.com",
//   phone: "(007) 365333",
// }).then((data) => console.log(data));

async function updateContact(contactId, contactData) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const updatedContact = { id: contactId, ...contactData };

  //* варіант 1, без мутації
  // const newContacts = [
  //   ...contacts.slice(0, index),
  //   updatedContact,
  //   ...contacts.slice(index + 1),
  // ];

  // await writeContacts(newContact);

  //* варіант 2, мутація
  contacts[index] = updatedContact;

  await writeContacts(contacts);

  return updatedContact;
}

// update("e6ywwRe4jcqxXfCZOj_1e", {
//   name: "Ninka",
//   email: "ninka@gmail.com",
//   phone: "(088) 32521231",
// }).then((data) => console.log(data));

export default {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
