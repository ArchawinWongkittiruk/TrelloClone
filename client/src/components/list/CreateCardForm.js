import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addCard } from '../../actions/board';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const CreateCardForm = ({ listId, setAdding }) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const formRef = useRef(null);
  useEffect(() => {
    formRef && formRef.current && formRef.current.scrollIntoView();
  }, [title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addCard({ title, listId }));
    setTitle('');
  };

  return (
    <form ref={formRef} className='create-card-form' onSubmit={(e) => onSubmit(e)}>
      <Card>
        <CardContent className='card-edit-content'>
          <TextField
            margin='normal'
            fullWidth
            multiline
            required
            label='Enter a title for this card'
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSubmit(e)}
          />
        </CardContent>
      </Card>
      <div className='card-actions'>
        <Button type='submit' variant='contained' color='primary'>
          Add Card
        </Button>
        <Button
          onClick={() => {
            setAdding(false);
            setTitle('');
          }}
        >
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
