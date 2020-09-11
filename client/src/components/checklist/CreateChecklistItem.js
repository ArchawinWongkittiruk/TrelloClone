import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addChecklistItem } from '../../actions/board';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../../utils/modalStyles';

const CreateChecklistItem = ({ cardId }) => {
  const classes = useStyles();
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addChecklistItem(cardId, { text }));
    setText('');
  };

  return !adding ? (
    <div className={classes.checklistBottom}>
      <Button variant='contained' onClick={() => setAdding(true)}>
        + Add an item
      </Button>
    </div>
  ) : (
    <div className={classes.checklistBottom}>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant='filled'
          fullWidth
          multiline
          required
          label='Add an item'
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSubmit(e)}
        />
        <div>
          <Button type='submit' variant='contained' color='primary'>
            Add
          </Button>
          <Button
            onClick={() => {
              setAdding(false);
              setText('');
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

CreateChecklistItem.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CreateChecklistItem;
