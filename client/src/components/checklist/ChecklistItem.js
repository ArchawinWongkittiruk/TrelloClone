import React, { Fragment, useState, useEffect, useContext } from 'react';
import { BoardContext } from '../../contexts/BoardStore';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../../utils/modalStyles';

const ChecklistItem = ({ item, card }) => {
  const { completeChecklistItem, editChecklistItem, deleteChecklistItem } = useContext(BoardContext);

  const classes = useStyles();
  const [text, setText] = useState(item.text);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setText(item.text);
  }, [item.text]);

  const onEdit = async (e) => {
    e.preventDefault();
    editChecklistItem(card._id, item._id, { text })
    setEditing(false);
  };

  const onComplete = async (e) => {
      completeChecklistItem({
        cardId: card._id,
        complete: e.target.checked,
        itemId: item._id,
      })
  };

  const onDelete = async (e) => {
    deleteChecklistItem(card._id, item._id)
  };

  return (
    <div className={classes.checklistItem}>
      {editing ? (
        <form onSubmit={onEdit} className={classes.checklistFormLabel}>
          <TextField
            variant='filled'
            fullWidth
            multiline
            required
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onEdit(e)}
          />
          <div>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
            <Button
              onClick={() => {
                setEditing(false);
                setText(item.text);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </form>
      ) : (
        <Fragment>
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  card.checklist.find((cardItem) => cardItem._id === item._id).complete
                }
                onChange={onComplete}
                name={item._id}
              />
            }
            label={item.text}
            className={classes.checklistFormLabel}
          />
          <div className={classes.itemButtons}>
            <Button className={classes.itemButton} onClick={() => setEditing(true)}>
              <EditIcon />
            </Button>
            <Button color='secondary' className={classes.itemButton} onClick={onDelete}>
              <HighlightOffIcon />
            </Button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

ChecklistItem.propTypes = {
  item: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
};

export default ChecklistItem;
