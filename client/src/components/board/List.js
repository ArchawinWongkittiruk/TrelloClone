import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { getList } from '../../actions/board';

const List = ({ listId }) => {
  const [title, setTitle] = useState('');
  const list = useSelector((state) =>
    state.board.board.listObjects.find((object) => object._id === listId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(listId));
  }, [dispatch, listId]);

  useEffect(() => {
    setTitle(list ? list.title : '');
  }, [setTitle, list]);

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return !list ? (
    ''
  ) : (
    <div className='list'>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField required value={title} onChange={(e) => setTitle(e.target.value)} />
      </form>
    </div>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
};

export default List;
