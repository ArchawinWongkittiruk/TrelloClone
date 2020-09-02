import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { renameList } from '../../actions/board';
import { TextField } from '@material-ui/core';

const List = ({ list }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(list.title ? list.title : '');
  }, [list.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // renameList({ title });
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
  // renameList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  board: state.board.board,
});

export default connect(mapStateToProps)(List);
