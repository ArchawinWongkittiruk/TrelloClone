import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import CardMUI from '@material-ui/core/Card';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { TextField, CardContent, Button } from '@material-ui/core';

const Card = ({ cardId }) => {
  const [editing, setEditing] = useState(false);
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

  const onSubmitEdit = (e) => {
    e.preventDefault();
    (async function editCard() {
      setCard((await axios.patch(`/api/cards/edit/${cardId}`, { title }, config)).data);
    })();
    setEditing(false);
    setMouseOver(false);
  };

  return !card || (card && card.archived) ? (
    ''
  ) : (
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
        <CardContent>
          <p>{card.title}</p>
        </CardContent>
      ) : (
        <div className='create-card-form'>
          <form onSubmit={(e) => onSubmitEdit(e)}>
            <TextField
              variant='filled'
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
                }}
              >
                <CloseIcon />
              </Button>
            </div>
          </form>
        </div>
      )}
    </CardMUI>
  );
};

Card.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default Card;
