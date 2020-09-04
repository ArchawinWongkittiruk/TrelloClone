import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addCard } from '../../actions/board';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const CreateCard = ({ listId }) => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addCard({ title, listId }));
    setTitle('');
    setAdding(false);
  };

  return !adding ? (
    <div className='create-card-button'>
      <Button variant='contained' onClick={() => setAdding(true)}>
        + Add a card
      </Button>
    </div>
  ) : (
    <div className='create-card-form'>
      <form onSubmit={(e) => onSubmit(e)}>
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
    </div>
  );
};

CreateCard.propTypes = {
  listId: PropTypes.string.isRequired,
};

export default CreateCard;
