import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getBoard } from '../../actions/board';
import { CircularProgress, Box } from '@material-ui/core';
import BoardTitle from '../board/BoardTitle';
import List from '../board/List';

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
      <BoardTitle boardId={board._id} originalTitle={board.title} />
      <div className='lists'>
        {board.lists.map((list) => (
          <List key={list._id ? list._id : list} list={list._id ? list : {}} />
        ))}
      </div>
    </section>
  );
};

export default Board;
