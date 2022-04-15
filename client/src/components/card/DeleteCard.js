import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { BoardContext } from '../../contexts/BoardStore';

const DeleteCard = ({ cardId, setOpen, list }) => {
  const { deleteCard } = useContext(BoardContext);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onDeleteCard = async () => {
    deleteCard(list._id, cardId);
    setOpenDialog(false);
    setOpen(false);
  };

  return (
    <div>
      <Button variant='contained' color='secondary' onClick={handleClickOpen}>
        Delete Card
      </Button>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{'Delete card?'}</DialogTitle>
        <DialogActions>
          <Button onClick={onDeleteCard} variant='contained' color='secondary' autoFocus>
            Delete
          </Button>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
};

export default DeleteCard;
