import React, { useRef, useState, useEffect } from 'react';
import { addList } from '../../actions/board';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import withStore from '../../Store/withStore';


const CreateList = withStore(['board'], ({store}) => {
  const { dispatch } = store

  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');

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
      <form onSubmit={onSubmit}>
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
});

export default CreateList;
