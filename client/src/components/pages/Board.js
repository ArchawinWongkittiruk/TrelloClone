import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getBoard } from '../../actions/board';
import { CircularProgress, Box } from '@material-ui/core';
import BoardTitle from '../board/BoardTitle';
import BoardDrawer from '../board/BoardDrawer';
import List from '../board/List';
import CreateList from '../board/CreateList';
import Members from '../board/Members';

const Board = ({ match }) => {
  const board = useSelector((state) => state.board.board);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoard(match.params.id));
  }, [dispatch, match.params.id]);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return !board ? (
    <Box className='board-loading'>
      <CircularProgress />
    </Box>
  ) : (
    <section className='board'>
      <div className='board-top'>
        <div className='board-top-left'>
          <BoardTitle boardId={board._id} originalTitle={board.title} />
          <Members />
        </div>
        <BoardDrawer />
      </div>
      <div className='lists'>
        {board.lists.map((listId) => (
          <List key={listId} listId={listId} />
        ))}
        <CreateList />
      </div>
    </section>
  );
};

export default Board;
