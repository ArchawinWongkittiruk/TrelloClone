import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../../actions/board';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const CreateList = () => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const formRef = useRef(null);
  useEffect(() => {
    formRef && formRef.current && formRef.current.scrollIntoView();
  }, [title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addList({ title }));
    setTitle('');
  };

  return !adding ? (
    <div className='create-list-button'>
      <Button variant='contained' onClick={() => setAdding(true)}>
        + Add a list
      </Button>
    </div>
  ) : (
    <div ref={formRef} className='create-list-form'>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant='outlined'
          fullWidth
          margin='normal'
          required
          label='Enter list title'
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <Button type='submit' variant='contained' color='primary'>
            Add List
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
    </div>
  );
};

export default CreateList;
