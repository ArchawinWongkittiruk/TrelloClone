import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getBoard } from '../../actions/board';
import { CircularProgress, Box } from '@material-ui/core';

const Board = ({ board, getBoard, match, isAuthenticated }) => {
  useEffect(() => {
    getBoard(match.params.id);
  }, [getBoard, match.params.id]);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return !board ? (
    <Box className='board-loading'>
      <CircularProgress />
    </Box>
  ) : (
    <section className='board'>
      <h1>{board.title}</h1>
    </section>
  );
};

Board.propTypes = {
  board: PropTypes.object.isRequired,
  getBoard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  board: state.board.board,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getBoard })(Board);
