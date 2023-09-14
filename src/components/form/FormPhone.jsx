import { useState } from 'react';
import css from './FormFone.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContactsThunk } from 'redux/contacts/productThunk';

export const FormPhone = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { contacts } = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const hendleChange = e => {
    const { name, value } = e.target;

    const switchInput = name => {
      switch (name) {
        case 'name':
          setName(value.trim());
          break;
        case 'number':
          setNumber(value.trim());
          break;
        default:
          return;
      }
    };
    contacts.some(
      ({ name }) => name.toLowerCase() === value.toLowerCase().trim()
    )
      ? alert(` ${value} is already in contacts`)
      : switchInput(name);
  };

  const formSubmit = e => {
    e.preventDefault();
    dispatch(addContactsThunk({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form_Add_Contact} onSubmit={formSubmit}>
      <div className={css.decor_input}>
        <label className={css.lable} htmlFor="name">
          Name
        </label>
        <input
          className={css.input}
          id="name"
          type="text"
          name="name"
          // pattern={validName}
          // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={hendleChange}
          value={name}
        />
      </div>
      <div className={css.decor_input}>
        <label className={css.lable} htmlFor="number">
          Number
        </label>
        <input
          className={css.input}
          id="number"
          type="tel"
          name="number"
          // pattern={validPhone}
          // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={hendleChange}
          value={number}
        />
      </div>
      <button className={css.btn_add} type="submit" disabled={!name || !number}>
        Add contact
      </button>
    </form>
  );
};
