import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getList } from '../../actions/board';
import ListTitle from './ListTitle';
import ListMenu from './ListMenu';
import Card from './Card';
import CreateCardForm from './CreateCardForm';
import Button from '@material-ui/core/Button';

const List = ({ listId }) => {
  const [addingCard, setAddingCard] = useState(false);
  const list = useSelector((state) =>
    state.board.board.listObjects.find((object) => object._id === listId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(listId));
  }, [dispatch, listId]);

  const createCardFormRef = useRef(null);
  useEffect(() => {
    addingCard && createCardFormRef.current.scrollIntoView();
  }, [addingCard]);

  return !list || (list && list.archived) ? (
    ''
  ) : (
    <div className='list-wrapper'>
      <div className='list-top'>
        <ListTitle listId={listId} originalTitle={list.title} />
        <ListMenu listId={listId} />
      </div>
      <div className={`list ${addingCard ? 'adding-card' : 'not-adding-card'}`}>
        <div className='cards'>
          {list.cards.map((cardId) => (
            <Card key={cardId} cardId={cardId} list={list} />
          ))}
        </div>
        {addingCard && (
          <div ref={createCardFormRef}>
            <CreateCardForm listId={listId} setAdding={setAddingCard} />
          </div>
        )}
      </div>
      {!addingCard && (
        <div className='create-card-button'>
          <Button variant='contained' onClick={() => setAddingCard(true)}>
            + Add a card
          </Button>
        </div>
      )}
    </div>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
};

export default List;
