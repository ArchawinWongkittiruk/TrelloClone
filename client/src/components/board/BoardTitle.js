import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { renameBoard } from '../../actions/board';
import { TextField } from '@material-ui/core';

const BoardTitle = ({ board }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(board.title);
  }, [board.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(renameBoard(board._id, { title }));
    setEditing(false);
  };

  return !editing ? (
    <h2 className='board-title' onClick={() => setEditing(true)}>
      {board.title}
    </h2>
  ) : (
    <form className='board-title-form' onSubmit={(e) => onSubmit(e)}>
      <TextField
        variant='outlined'
        required
        value={title}
        size='small'
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

BoardTitle.propTypes = {
  board: PropTypes.object.isRequired,
};

export default BoardTitle;
