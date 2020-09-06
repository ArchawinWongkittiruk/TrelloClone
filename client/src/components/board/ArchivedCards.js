import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { archiveCard, deleteCard } from '../../actions/board';

import { Card, List, ListItem, CardContent, Button } from '@material-ui/core';

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
              <Card>
                <CardContent>{card.title}</CardContent>
              </Card>
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
