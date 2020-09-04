import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getList } from '../../actions/board';
import ListTitle from './ListTitle';
import ListMenu from './ListMenu';

const List = ({ listId }) => {
  const list = useSelector((state) =>
    state.board.board.listObjects.find((object) => object._id === listId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(listId));
  }, [dispatch, listId]);

  return !list || (list && list.archived) ? (
    ''
  ) : (
    <div className='list'>
      <div className='list-top'>
        <ListTitle listId={listId} originalTitle={list.title} />
        <ListMenu listId={listId} />
      </div>
    </div>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
};

export default List;
