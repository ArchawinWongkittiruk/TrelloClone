import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { renameBoard } from '../../actions/board';
import { TextField } from '@material-ui/core';

const BoardTitle = ({ boardId, originalTitle }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(originalTitle);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(renameBoard(boardId, { title }));
    setEditing(false);
  };

  return !editing ? (
    <h2 className='board-title' onClick={() => setEditing(true)}>
      {title}
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
  boardId: PropTypes.string.isRequired,
  originalTitle: PropTypes.string.isRequired,
};

export default BoardTitle;
