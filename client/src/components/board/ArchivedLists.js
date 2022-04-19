import React, {useContext} from 'react';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { BoardContext } from '../../contexts/BoardStore';
import { useEffect } from 'react';


const ArchivedLists = ({update}) => {
  const { board: {board: {listObjects}}, archiveList } = useContext(BoardContext);

  const unarchive = async (listId) => archiveList(listId, false)
  
  const visualUnarchive = (listId) => {
    listObjects.find((object) => object._id === listId).archived=false
    update()
  }

  return (
    <div>
      <List>
        {listObjects
          .filter((list) => list.archived)
          .map((list, index) => (
            <ListItem key={index}>
              <ListItemText primary={list.title} />
              <Button onClick={() => {
                visualUnarchive(list._id)
                unarchive(list._id)
                }}>Send to Board</Button>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ArchivedLists;
