import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { archiveList } from '../../actions/board';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ArchivedLists = () => {
  const listObjects = useSelector((state) => state.board.board.listObjects);
  const dispatch = useDispatch();

  const onSubmit = async (listId) => {
    dispatch(archiveList(listId, false));
  };

  return (
    <div>
      <List>
        {listObjects
          .filter((list) => list.archived)
          .map((list, index) => (
            <ListItem key={index}>
              <ListItemText primary={list.title} />
              <Button onClick={() => onSubmit(list._id)}>Send to Board</Button>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ArchivedLists;
