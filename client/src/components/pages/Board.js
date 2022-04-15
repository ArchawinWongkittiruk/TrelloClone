import React, { Fragment, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CircularProgress, Box } from '@material-ui/core';
import BoardTitle from '../board/BoardTitle';
import BoardDrawer from '../board/BoardDrawer';
import List from '../list/List';
import CreateList from '../board/CreateList';
import Members from '../board/Members';
import Navbar from '../other/Navbar';
import { BoardContext } from '../../contexts/BoardStore';
import { AuthContext } from '../../contexts/AuthStore';

const Board = ({ match }) => {
  const { auth: {isAuthenticated} } = useContext(AuthContext);
  const { board: {board}, getBoard, moveCard, moveList } = useContext(BoardContext);

  const [title, backgroundURL, lists] = [board?.title, board?.backgroundURL, board?.lists]

  const defaultBackground = 'https://images.unsplash.com/photo-1598197748967-b4674cb3c266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80'
  
  useEffect(() => {
    getBoard(match.params.id)
  }, [match.params.id, getBoard]);

  useEffect(() => {
    if (title) document.title = title + ' | TrelloClone';
  }, [title]);

  if (!isAuthenticated) return <Redirect to='/' />

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return

    if (type === 'card') {
      moveCard(draggableId, {
          fromId: source.droppableId,
          toId: destination.droppableId,
          toIndex: destination.index,
        })
    } else moveList(draggableId, { toIndex: destination.index })
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
        backgroundImage: `url(${backgroundURL || defaultBackground})`,
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
                {lists.map((listId, index) => (
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
};

export default Board;
