import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { renameList } from '../../actions/board';
import { TextField } from '@material-ui/core';
import withStore from '../../Store/withStore';

const ListTitle = withStore(['board'], ({store, props}) => {
  const { list } = props
  const { dispatch } = store

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(list.title);

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
    <form onSubmit={onSubmit}>
      <TextField required value={title} onChange={(e) => setTitle(e.target.value)} />
    </form>
  );
});

ListTitle.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListTitle;
