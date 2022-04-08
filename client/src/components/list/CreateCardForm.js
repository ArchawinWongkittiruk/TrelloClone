import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addCard } from '../../actions/board';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import withStore from '../../Store/withStore';

const CreateCardForm = withStore(['board'], ({store, props}) => {
  const { listId, setAdding } = props
  const { dispatch } = store
  
  const [title, setTitle] = useState('');
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
    <form ref={formRef} className='create-card-form' onSubmit={onSubmit}>
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
});

CreateCardForm.propTypes = {
  listId: PropTypes.string.isRequired,
  setAdding: PropTypes.func.isRequired,
};

export default CreateCardForm;
