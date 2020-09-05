import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import CardMUI from '@material-ui/core/Card';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SubjectIcon from '@material-ui/icons/Subject';
import { TextField, CardContent, Button } from '@material-ui/core';
import CardModal from './CardModal';

const Card = ({ cardId }) => {
  const [editing, setEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [card, setCard] = useState(null);
  const [title, setTitle] = useState('');

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    (async function getCard() {
      setCard((await axios.get(`/api/cards/${cardId}`)).data);
    })();
  }, [cardId]);

  useEffect(() => {
    card && setTitle(card.title);
  }, [card]);

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    setCard((await axios.patch(`/api/cards/edit/${cardId}`, { title }, config)).data);
    setEditing(false);
    setMouseOver(false);
  };

  return !card || (card && card.archived) ? (
    ''
  ) : (
    <Fragment>
      <CardModal
        cardId={cardId}
        open={openModal}
        setOpen={setOpenModal}
        card={card}
        setCard={setCard}
        config={config}
      />
      <CardMUI
        className={`card ${mouseOver && !editing ? 'mouse-over' : ''}`}
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        {mouseOver && !editing && (
          <Button className='edit-button' onClick={() => setEditing(true)}>
            <EditIcon fontSize='small' />
          </Button>
        )}
        {!editing ? (
          <CardContent
            onClick={() => {
              setOpenModal(true);
              setMouseOver(false);
            }}
          >
            <p>{card.title}</p>
            {card.description && <SubjectIcon fontSize='small' />}
          </CardContent>
        ) : (
          <CardContent className='create-card-form'>
            <form onSubmit={(e) => onSubmitEdit(e)}>
              <TextField
                margin='normal'
                fullWidth
                multiline
                required
                id='title'
                label="Edit this card's title"
                name='title'
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div>
                <Button type='submit' variant='contained' color='primary'>
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setEditing(false);
                    setMouseOver(false);
                    setTitle(card.title);
                  }}
                >
                  <CloseIcon />
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </CardMUI>
    </Fragment>
  );
};

Card.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default Card;
