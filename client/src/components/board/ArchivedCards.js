import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { archiveCard } from '../../actions/board';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ArchivedCards = () => {
  const cards = useSelector((state) => state.board.board.cardObjects);
  const dispatch = useDispatch();

  const onSubmit = (cardId) => {
    dispatch(archiveCard(cardId, false));
  };

  return (
    <div>
      <List>
        {cards
          .filter((card) => card.archived)
          .map((card, index) => (
            <ListItem key={index}>
              <ListItemText primary={card.title} />
              <Button onClick={() => onSubmit(card._id)}>Send to List</Button>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ArchivedCards;
