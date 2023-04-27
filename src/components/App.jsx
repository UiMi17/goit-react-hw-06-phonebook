import React from 'react';
import { nanoid } from 'nanoid';
import ContactsForm from './Contacts-form/ContactsForm';
import ContactsList from './Contacts-list/ContactsList';
import Filter from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/contactsSelectors';
import { addContact, deleteContact, setFilter } from 'redux/contactsSlice';
import { StyledTitle } from './StyledTitle';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const createContact = ev => {
    const { name, number } = ev.target.elements;
    const USERNAME = name.value;
    const USER_NUMBER = number.value;

    const CONTACTS_NAMES = contacts.map(contact => {
      return contact.name;
    });

    if (!CONTACTS_NAMES.includes(USERNAME)) {
      dispatch(
        addContact({ name: USERNAME, number: USER_NUMBER, id: nanoid() })
      );
    } else {
      alert(`${USERNAME} is already in contacts.`);
    }
  };

  const handleFormSubmit = ev => {
    ev.preventDefault();
    createContact(ev);
    ev.currentTarget.reset();
  };

  const handleSearchInputChange = ev => {
    dispatch(setFilter(ev.target.value));
  };

  const handleDeleteBtnClick = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      <StyledTitle>Phonebook</StyledTitle>
      <ContactsForm handleFormSubmit={handleFormSubmit} />

      <StyledTitle>Contacts</StyledTitle>
      <Filter handleSearchInputChange={handleSearchInputChange} />
      <ContactsList
        contacts={filteredContacts}
        handleDeleteBtnClick={handleDeleteBtnClick}
      />
    </>
  );
};
