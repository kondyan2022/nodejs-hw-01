const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
  // ...твій код. Повертає масив контактів.
}

async function getContactById(contactId) {
  const list = await listContacts();
  const contact = list.find((elem) => elem.id === contactId);
  return contact || null;
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(contactId) {
  const list = await listContacts();
  const index = list.findIndex((elem) => elem.id === contactId);
  if (index === -1) {
    return null;
  }
  const [contact] = list.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return contact;
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
  const list = await listContacts();
  const contact = { id: nanoid(), name, email, phone };
  list.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return contact;
  // ...твій код. Повертає об'єкт доданого контакту.
}
module.exports = { listContacts, getContactById, removeContact, addContact };
