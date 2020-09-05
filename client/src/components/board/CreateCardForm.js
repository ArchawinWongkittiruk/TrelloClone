import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addCard } from '../../actions/board';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const CreateCardForm = ({ listId, setAdding }) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addCard({ title, listId }));
    setTitle('');
    setAdding(false);
  };

  return (
    <form className='create-card-form' onSubmit={(e) => onSubmit(e)}>
      <TextField
        variant='filled'
        margin='normal'
        fullWidth
        multiline
        required
        id='title'
        label='Enter a title for this card'
        name='title'
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <Button type='submit' variant='contained' color='primary'>
          Add Card
        </Button>
        <Button onClick={() => setAdding(false)}>
          <CloseIcon />
        </Button>
      </div>
    </form>
  );
};

CreateCardForm.propTypes = {
  listId: PropTypes.string.isRequired,
  setAdding: PropTypes.func.isRequired,
};

export default CreateCardForm;
