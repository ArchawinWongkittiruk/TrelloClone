import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import CardMUI from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';

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
