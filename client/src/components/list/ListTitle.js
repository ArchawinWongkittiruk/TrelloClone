import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { renameList } from '../../actions/board';
import { TextField } from '@material-ui/core';

const ListTitle = ({ list }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(list.title);
  }, [list.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(renameList(list._id, { title }));
    setEditing(false);
  };

  return !editing ? (
    <h3 className='list-title' onClick={() => setEditing(true)}>
      {list.title}
    </h3>
  ) : (
    <form onSubmit={(e) => onSubmit(e)}>
      <TextField required value={title} onChange={(e) => setTitle(e.target.value)} />
    </form>
  );
};

ListTitle.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListTitle;
