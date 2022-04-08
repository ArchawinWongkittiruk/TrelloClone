import React from 'react';
import { archiveCard, deleteCard } from '../../actions/board';
import { Card, List, ListItem, CardContent, Button } from '@material-ui/core';
import withStore from '../../Store/withStore';

const ArchivedCards = withStore(['board'], ({store}) => {
  const { state, dispatch } = store

  const { cardObjects, listObjects} = state.boardState.board

  const onDelete = async (listId, cardId) => dispatch(deleteCard(listId, cardId));
  const onSendBack = async (cardId) => dispatch(archiveCard(cardId, false));

  return (
    <div>
      <List>
        {cardObjects
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
                      listObjects.find((list) => list.cards.includes(card._id))._id,
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
});

export default ArchivedCards;
