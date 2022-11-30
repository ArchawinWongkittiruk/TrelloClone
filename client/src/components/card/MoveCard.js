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

const MoveCard = ({ cardId, setOpen, thisList }) => {
  const classes = useStyles();
  const [listObject, setListObject] = useState(null);
  const [listTitle, setListTitle] = useState('');
  const [position, setPosition] = useState(0);
  const [positions, setPositions] = useState([0]);
  const lists = useSelector((state) => state.board.board.lists);
  const listObjects = useSelector((state) =>
    state.board.board.listObjects
      .sort(
        (a, b) =>
          lists.findIndex((id) => id === a._id) - lists.findIndex((id) => id === b._id)
      )
      .filter((list) => !list.archived)
  );
  const cardObjects = useSelector((state) => state.board.board.cardObjects);
  const dispatch = useDispatch();

  useEffect(() => {
    setListObject(thisList);
    setListTitle(thisList.title);
  }, [thisList, cardId]);

  useEffect(() => {
    if (listObject) {
      const unarchivedListCards = listObject.cards
        .map((id, index) => {
          const card = cardObjects.find((object) => object._id === id);
          const position = index;
          return { card, position };
        })
        .filter((card) => !card.card.archived);
      let cardPositions = unarchivedListCards.map((card) => card.position);
      if (listObject !== thisList) {
        cardPositions = cardPositions.concat(listObject.cards.length);
      }
      if (listObject.cards.length > 0) {
        setPositions(cardPositions);
        setPosition(thisList.cards.findIndex((id) => id === cardId));
      } else {
        setPositions([0]);
        setPosition(0);
      }
    }
  }, [thisList, cardId, listObject, cardObjects]);

  const onSubmit = async () => {
    dispatch(
      moveCard(cardId, { fromId: thisList._id, toId: listObject._id, toIndex: position })
    );
    setOpen(false);
  };

  return (
    <div className={classes.moveCard}>
      <h3 className={classes.moveCardTitle}>Mover Cartão</h3>
      <div>
        <FormControl className={classes.moveCardSelect}>
          <InputLabel shrink>Lista</InputLabel>
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
          <InputLabel shrink>Posição</InputLabel>
          <Select
            value={position}
            required
            onChange={(e) => setPosition(e.target.value)}
            displayEmpty
          >
            {positions.map((position, index) => (
              <MenuItem key={position} value={position}>
                {index + 1}
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
        Mover Cartão
      </Button>
    </div>
  );
};

MoveCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  thisList: PropTypes.object.isRequired,
};

export default MoveCard;
