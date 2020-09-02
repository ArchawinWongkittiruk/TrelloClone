import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { renameBoard } from '../../actions/board';
import { TextField } from '@material-ui/core';

const BoardTitle = ({ originalTitle, renameBoard }) => {
  const [title, setTitle] = useState(originalTitle);

  const onSubmit = async (e) => {
    e.preventDefault();
    renameBoard({ title });
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <TextField required value={title} onChange={(e) => setTitle(e.target.value)} />
    </form>
  );
};

BoardTitle.propTypes = {
  originalTitle: PropTypes.string.isRequired,
  renameBoard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  board: state.board.board,
});

export default connect(mapStateToProps, { renameBoard })(BoardTitle);
