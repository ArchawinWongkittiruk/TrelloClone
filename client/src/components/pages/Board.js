import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getBoard } from '../../actions/board';
import { CircularProgress, Box } from '@material-ui/core';
import BoardTitle from '../board/BoardTitle';
import List from '../board/List';

const Board = ({ board: { board, loading }, getBoard, match, isAuthenticated }) => {
  useEffect(() => {
    getBoard(match.params.id);
  }, [getBoard, match.params.id]);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return loading || !board ? (
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

Board.propTypes = {
  board: PropTypes.object.isRequired,
  getBoard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  board: state.board,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getBoard })(Board);
