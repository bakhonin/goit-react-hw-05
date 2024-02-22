import css from './SearchForm.module.css';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const SearchForm = ({ value = '', onSubmit }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = event => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      toast.error('Empty string!');
      return;
    }
    onSubmit(inputValue);
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="submit">Search</button>
    </form>
  );
};
