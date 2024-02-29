const { nanoid } = require('nanoid');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const data = await listContacts();
  const contactById = data.find(contact => contact.id === contactId);
  return contactById || null;
};

const removeContact = async contactId => {
  const data = await listContacts();
  const index = data.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  data.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
