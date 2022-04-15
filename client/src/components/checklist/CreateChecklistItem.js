import React, { useState, useContext } from 'react';
import { BoardContext } from '../../contexts/BoardStore';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../../utils/modalStyles';


const CreateChecklistItem = ({ cardId }) => {
  const { addChecklistItem } = useContext(BoardContext);

  const classes = useStyles();
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    addChecklistItem(cardId, { text })
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
      <form onSubmit={onSubmit}>
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
