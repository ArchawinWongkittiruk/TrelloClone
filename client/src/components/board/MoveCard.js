import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { moveCard } from '../../actions/board';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from '../../utils/modalStyles';

const MoveCard = ({ cardId, setOpen }) => {
  const classes = useStyles();
  const [listObject, setListObject] = useState(null);
  const [listTitle, setListTitle] = useState('');
  const [position, setPosition] = useState(0);
  const [positions, setPositions] = useState([0]);
  const lists = useSelector((state) => state.board.board.lists);
  const listObjects = useSelector((state) =>
    state.board.board.listObjects.sort(
      (a, b) =>
        lists.findIndex((id) => id === a._id) - lists.findIndex((id) => id === b._id)
    )
  );
  const thisListId = listObjects.find((list) => list.cards.includes(cardId))._id;
  const thisList = listObjects.find((list) => list._id === thisListId);
  const dispatch = useDispatch();

  useEffect(() => {
    setListObject(thisList);
    setListTitle(thisList.title);
    setPosition(thisList.cards.findIndex((id) => id === cardId));
  }, [thisList, cardId]);

  useEffect(() => {
    setPositions(
      listObject && listObject.cards.length > 0
        ? [...Array(listObject.cards.length + (listObject !== thisList ? 1 : 0)).keys()]
        : [0]
    );
    listObject && listObject.cards.length === 0 && setPosition(0);
  }, [thisList, listObject]);

  const onSubmit = async () => {
    dispatch(
      moveCard(cardId, { fromId: thisListId, toId: listObject._id, toIndex: position })
    );
    setOpen(false);
  };

  return (
    <div className={classes.moveCard}>
      <h3 className={classes.moveCardTitle}>Move this card</h3>
      <div>
        <FormControl className={classes.moveCardSelect}>
          <InputLabel shrink>List</InputLabel>
          <Select
            value={listTitle}
            required
            onChange={(e) => {
              setListTitle(e.target.value);
              setListObject(listObjects.find((list) => list.title === e.target.value));
            }}
            displayEmpty
          >
            {listObjects.map((list) => (
              <MenuItem key={list._id} value={list.title}>
                {list.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.moveCardSelect}>
          <InputLabel shrink>Position</InputLabel>
          <Select
            value={position}
            required
            onChange={(e) => setPosition(e.target.value)}
            displayEmpty
          >
            {positions.map((position) => (
              <MenuItem key={position} value={position}>
                {position + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        onClick={onSubmit}
      >
        Move Card
      </Button>
    </div>
  );
};

MoveCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default MoveCard;
