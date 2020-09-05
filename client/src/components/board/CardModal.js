import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../../utils/modalStyles';

const CardModal = ({ open, setOpen, card }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(card.title);

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={`${classes.paper} ${classes.cardModal}`}>
        <div className={classes.modalTop}>
          <form onSubmit={(e) => onSubmit(e)}>
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
          </form>
          <Button onClick={() => setOpen(false)}>
            <CloseIcon />
          </Button>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            multiline
            id='description'
            label='Card description'
            name='description'
            // value={description}
            // onChange={(e) => setDescription(e.target.value)}
          />
        </form>
      </div>
    </Modal>
  );
};

CardModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
};

export default CardModal;
