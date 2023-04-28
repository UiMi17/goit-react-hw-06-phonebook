import { createSlice } from '@reduxjs/toolkit';

const initialState = { contacts: [], filter: '' };

const contactsSlice = createSlice({
  name: '@@contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(contact => {
        return contact.id !== action.payload;
      });
    },
  },
});

export const { addContact, setFilter, deleteContact } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
