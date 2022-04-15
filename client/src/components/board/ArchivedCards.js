import React, {useContext} from 'react';
import { BoardContext } from '../../contexts/BoardStore';


import { Card, List, ListItem, CardContent, Button } from '@material-ui/core';

const ArchivedCards = () => {
  const { board: {board: {listObjects, cardObjects}}, archiveCard, deleteCard } = useContext(BoardContext);

  const onDelete = async (listId, cardId) => {
    deleteCard(listId, cardId)
  };

  const onSendBack = async (cardId) => {
    archiveCard(cardId, false)
  };

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
};

export default ArchivedCards;
