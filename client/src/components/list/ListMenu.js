import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { archiveList } from '../../actions/board';
import { Button, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoveList from './MoveList';
import withStore from '../../Store/withStore';

const ListMenu = withStore(['board'], ({store, props}) => {
  const { listId } = props
  const { dispatch } = store

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const archive = async () => dispatch(archiveList(listId, true));

  return (
    <div>
      <Button onClick={handleClick}>
        <MoreHorizIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <MoreHorizIcon />
        </MenuItem>
        <MenuItem
          onClick={() => {
            archive();
            handleClose();
          }}
        >
          Archive This List
        </MenuItem>
        <MenuItem>
          <MoveList listId={listId} closeMenu={handleClose} />
        </MenuItem>
      </Menu>
    </div>
  );
});

ListMenu.propTypes = {
  listId: PropTypes.string.isRequired,
};

export default ListMenu;
