import React, { Fragment, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { BoardContext } from '../../contexts/BoardStore';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from '../../utils/dialogStyles';

const MoveList = ({ listId, closeMenu }) => {
  const { board:{board:{lists, listObjects}}, moveList } = useContext(BoardContext);

  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [position, setPosition] = useState(0);
  const [positions, setPositions] = useState([0]);

  useEffect(() => {
    const mappedListObjects = listObjects.sort((a, b) =>
          lists.findIndex((id) => id === a._id) - lists.findIndex((id) => id === b._id)
      ).map((list, index) => ({ list, index }));
    setPositions(mappedListObjects.filter((list) => !list.list.archived).map((list) => list.index))
    setPosition(mappedListObjects.findIndex((list) => list.list._id === listId))
  }, [listId, listObjects, lists]);

  const onSubmit = async () => {
    moveList(listId, { toIndex: position })
    setOpenDialog(false);
    closeMenu();
  };

  return (
    <Fragment>
      <div onClick={() => setOpenDialog(true)}>Move This List</div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className={classes.moveListTop}>
          <DialogTitle>{'Move List'}</DialogTitle>
          <Button onClick={() => setOpenDialog(false)}>
            <CloseIcon />
          </Button>
        </div>
        <DialogActions className={classes.moveListBottom}>
          <FormControl>
            <InputLabel shrink>Position</InputLabel>
            <Select
              value={position}
              required
              onChange={(e) => setPosition(e.target.value)}
              displayEmpty
            >
              {positions.map((position, index) => (
                <MenuItem key={position} value={position}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.moveListButton}
              onClick={onSubmit}
            >
              Move List
            </Button>
          </FormControl>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

MoveList.propTypes = {
  listId: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default MoveList;
