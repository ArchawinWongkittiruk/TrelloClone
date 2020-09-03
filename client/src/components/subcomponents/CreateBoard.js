import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addBoard } from '../../actions/board';
import { Modal, TextField, Button } from '@material-ui/core';
import useStyles from '../../utils/modalStyles';

const CreateBoard = ({ history }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addBoard({ title }, history));
  };

  const body = (
    <div className={classes.paper}>
      <h1>Create new board</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='title'
          label='Add board title'
          name='title'
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type='submit' fullWidth variant='contained' color='primary'>
          Create Board
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <button className='board-card create-board-card' onClick={() => setOpen(true)}>
        Create new board
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {body}
      </Modal>
    </div>
  );
};

export default withRouter(CreateBoard);
