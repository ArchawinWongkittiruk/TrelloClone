import React, { useRef, useState, useEffect, useContext } from 'react';
import { BoardContext } from '../../contexts/BoardStore';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ListTitle from './ListTitle';
import ListMenu from './ListMenu';
import Card from '../card/Card';
import CreateCardForm from './CreateCardForm';
import Button from '@material-ui/core/Button';

const List = ({ listId, index, archived, update }) => {
  const { board: {board: {listObjects}}, getList } = useContext(BoardContext);

  const [addingCard, setAddingCard] = useState(false);
  const [archivedState, setArchived] = useState();
  const [list, setList] = useState();

  const visualArchive = () => {
    list.archived = true
    setArchived(true)
    update()
  }

  useEffect(() => {
    getList(listId)
  }, [listId]);

  useEffect(() => {
    setList(listObjects.find((object) => object._id === listId))
  }, [listObjects]);

  useEffect(() => {
    setArchived(!!list?.archived)
  }, [list?.archived, archived]);

  const createCardFormRef = useRef(null);
  useEffect(() => {
    addingCard && createCardFormRef.current.scrollIntoView();
  }, [addingCard]);

  return !list || archivedState ? (
    ''
  ) : (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          className='list-wrapper'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className='list-top'>
            <ListTitle list={list} />
            <ListMenu listId={listId} visualArchive={visualArchive}/>
          </div>
          <Droppable droppableId={listId} type='card'>
            {(provided) => (
              <div
                className={`list ${addingCard ? 'adding-card' : 'not-adding-card'}`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className='cards'>
                  {list.cards.map((cardId, index, archived) => (
                    <Card key={cardId} list={list} setList={setList} cardId={cardId} index={index} archived={archived} update={update}/>
                  ))}
                </div>
                {provided.placeholder}
                {addingCard && (
                  <div ref={createCardFormRef}>
                    <CreateCardForm listId={listId} setAdding={setAddingCard}/>
                  </div>
                )}
              </div>
            )}
          </Droppable>
          {!addingCard && (
            <div className='create-card-button'>
              <Button variant='contained' onClick={() => setAddingCard(true)}>
                + Add a card
              </Button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default List;
