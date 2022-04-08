import React, { Fragment, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getBoard, moveCard, moveList } from '../../actions/board';
import { CircularProgress, Box } from '@material-ui/core';
import BoardTitle from '../board/BoardTitle';
import BoardDrawer from '../board/BoardDrawer';
import List from '../list/List';
import CreateList from '../board/CreateList';
import Members from '../board/Members';
import Navbar from '../other/Navbar';
import withStore from '../../Store/withStore';

const Board = withStore(['board','auth'],({store, props}) => {
  const {state, dispatch} = store

  const board = state.boardState.board
  const isAuthenticated = state.authState.isAuthenticated
  if (!isAuthenticated) return <Redirect to='/' />;

  const {id} = useParams()

  useEffect(() => {
    dispatch(getBoard(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (board?.title) document.title = board.title + ' | TrelloClone';
  }, [board?.title]);


  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === 'card') {
      dispatch(
        moveCard(draggableId, {
          fromId: source.droppableId,
          toId: destination.droppableId,
          toIndex: destination.index,
        })
      );
    } else {
      dispatch(moveList(draggableId, { toIndex: destination.index }));
    }
  };

  return !board ? (
    <Fragment>
      <Navbar />
      <Box className='board-loading'>
        <CircularProgress />
      </Box>
    </Fragment>
  ) : (
    <div
      className='board-and-navbar'
      style={{
        backgroundImage:
          'url(' +
          (board.backgroundURL
            ? board.backgroundURL
            : 'https://images.unsplash.com/photo-1598197748967-b4674cb3c266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80') +
          ')',
      }}
    >
      <Navbar />
      <section className='board'>
        <div className='board-top'>
          <div className='board-top-left'>
            <BoardTitle board={board} />
            <Members />
          </div>
          <BoardDrawer />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='all-lists' direction='horizontal' type='list'>
            {(provided) => (
              <div className='lists' ref={provided.innerRef} {...provided.droppableProps}>
                {board.lists.map((listId, index) => (
                  <List key={listId} listId={listId} index={index} />
                ))}
                {provided.placeholder}
                <CreateList />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
});

export default Board;
