import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { BoardContext } from '../../contexts/BoardStore';

const BoardTitle = ({ board }) => {
  const { renameBoard } = useContext(BoardContext);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(board.title);

  useEffect(() => {
    setTitle(board.title);
  }, [board.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    renameBoard(board._id, { title });
    setEditing(false);
  };

  return !editing ? (
    <h2 className='board-title' onClick={() => setEditing(true)}>
      {board.title}
    </h2>
  ) : (
    <form className='board-title-form' onSubmit={onSubmit}>
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
