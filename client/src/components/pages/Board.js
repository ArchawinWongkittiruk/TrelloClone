import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBoard } from '../../actions/board';
import CircularProgress from '@material-ui/core/CircularProgress';

const Board = ({ board, getBoard, match }) => {
  useEffect(() => {
    getBoard(match.params.id);
  }, [getBoard, match.params.id]);

  return !board ? (
    <CircularProgress />
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
});

export default connect(mapStateToProps, { getBoard })(Board);
