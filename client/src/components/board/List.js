import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const List = ({ list }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(list.title ? list.title : '');
  }, [list.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return list._id ? (
    <div className='list'>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField required value={title} onChange={(e) => setTitle(e.target.value)} />
      </form>
    </div>
  ) : (
    ''
  );
};

List.propTypes = {
  list: PropTypes.object.isRequired,
};

export default List;
