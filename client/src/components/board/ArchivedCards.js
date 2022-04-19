import React, {useContext, useState} from 'react';
import { BoardContext } from '../../contexts/BoardStore';


import { Card, List, ListItem, CardContent, Button } from '@material-ui/core';
import { useEffect } from 'react';

const ArchivedCards = ({update}) => {
  const { board: {board: {listObjects, cardObjects}}, archiveCard, deleteCard } = useContext(BoardContext);

  const [archivedCards, setArchivedCards] = useState(cardObjects);
  console.log(archivedCards)

  useEffect(() => {
    setArchivedCards(cardObjects)
  }, [cardObjects])


  const onDelete = async (listId, cardId) => {
    visualDelete(cardId)
    deleteCard(listId, cardId)
  };

  const onSendBack = async (cardId) => {
    visualUnarchive(cardId)
    archiveCard(cardId, false)
  };
  
  const visualUnarchive = (cardId) => {
    cardObjects.find((object) => object._id === cardId).archived=false
    setArchivedCards(cardObjects)
    update()
  }
  
  const visualDelete = (cardId) => { 
    setArchivedCards(cardObjects.filter((object) => object._id !== cardId))
    update()
  }

  return (
    <div>
      <List>
        {archivedCards
          .filter((card) => card.archived)
          .map((card, index) => (
            <ListItem key={index} className='archived-card'>
              <Card>
                <CardContent>{card.title}</CardContent>
              </Card>
              <div>
                <Button
                  color='secondary'
                  onClick={() =>{
                    visualDelete(card._id)
                    onDelete(
                      listObjects.find((list) => list.cards.includes(card._id))._id,
                      card._id
                    )
                  }
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
