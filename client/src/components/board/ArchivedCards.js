import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { archiveCard, deleteCard } from '../../actions/board';

import CardMUI from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';

const ArchivedCards = () => {
  const cards = useSelector((state) => state.board.board.cardObjects);
  const lists = useSelector((state) => state.board.board.listObjects);
  const dispatch = useDispatch();

  const onDelete = async (listId, cardId) => {
    dispatch(deleteCard(listId, cardId));
  };

  const onSendBack = async (cardId) => {
    dispatch(archiveCard(cardId, false));
  };

  return (
    <div>
      <List>
        {cards
          .filter((card) => card.archived)
          .map((card, index) => (
            <ListItem key={index} className='archived-card'>
              <CardMUI>{card.title}</CardMUI>
              <div>
                <Button
                  color='secondary'
                  onClick={() =>
                    onDelete(
                      lists.find((list) => list.cards.includes(card._id))._id,
                      card._id
                    )
                  }
                >
                  Delete Card
                </Button>
                <Button onClick={() => onSendBack(card._id)}>Send to List</Button>
              </div>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ArchivedCards;
