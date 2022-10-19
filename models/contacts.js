const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  return contactsList;
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const contactById = contactsList.find((item) => item.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contactsList.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return removeContact;
};

const addContact = async (body) => {
  const contactsList = await listContacts();
  const newContact = { id: v4(), ...body };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contactsList[idx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return contactsList[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
