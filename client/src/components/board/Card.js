import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import CardMUI from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const Card = ({ cardId }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [card, setCard] = useState(null);

  useEffect(() => {
    (async function getCard() {
      setCard((await axios.get(`/api/cards/${cardId}`)).data);
    })();
  }, [cardId]);

  return !card || (card && card.archived) ? (
    ''
  ) : (
    <CardMUI
      className={`card ${mouseOver ? 'mouse-over' : ''}`}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {mouseOver && (
        <Button className='edit-button'>
          <EditIcon fontSize='small' />
        </Button>
      )}
      <CardContent>
        <p>{card.title}</p>
      </CardContent>
    </CardMUI>
  );
};

Card.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default Card;
