import React, { useState, useEffect, useContext } from 'react';
import { BoardContext } from '../../contexts/BoardStore';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const ListTitle = ({ list }) => {
  const { renameList } = useContext(BoardContext);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(list.title);

  useEffect(() => {
    setTitle(list.title);
  }, [list.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    renameList(list._id, { title })
    setEditing(false);
  };

  return !editing ? (
    <h3 className='list-title' onClick={() => setEditing(true)}>
      {list.title}
    </h3>
  ) : (
    <form onSubmit={onSubmit}>
      <TextField required value={title} onChange={(e) => setTitle(e.target.value)} />
    </form>
  );
};

ListTitle.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListTitle;
