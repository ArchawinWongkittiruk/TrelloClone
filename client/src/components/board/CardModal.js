import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Modal, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MoveCard from './MoveCard';
import useStyles from '../../utils/modalStyles';

const CardModal = ({ cardId, open, setOpen, card, setCard, config }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);

  useEffect(() => {
    setTitle(card.title);
  }, [card]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setCard(
      (await axios.patch(`/api/cards/edit/${cardId}`, { title, description }, config))
        .data
    );
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={`${classes.paper} ${classes.cardModal}`}>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className={classes.modalTop}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              multiline
              id='title'
              label='Card title'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={classes.cardTitle}
            />
            <Button onClick={() => setOpen(false)}>
              <CloseIcon />
            </Button>
          </div>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            multiline
            id='description'
            label='Card description'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Save All Changes
          </Button>
        </form>
        <MoveCard cardId={cardId} setOpen={setOpen} />
      </div>
    </Modal>
  );
};

CardModal.propTypes = {
  cardId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  setCard: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
};

export default CardModal;
