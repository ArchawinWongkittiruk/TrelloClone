import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getBoard } from '../../actions/board';
import { CircularProgress, Box } from '@material-ui/core';
import BoardTitle from '../board/BoardTitle';

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
      <BoardTitle originalTitle={board.title} />
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
