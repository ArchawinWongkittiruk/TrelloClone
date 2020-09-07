import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// import { addMember } from '../../actions/board';
import { TextField, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';

const Members = () => {
  const [inviting, setInviting] = useState(false);
  const [member, setMember] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [membersWithRegex, setMembersWithRegex] = useState([]);
  const boardMembers = useSelector((state) => state.board.board.members);
  const searchOptions = membersWithRegex.filter((member) =>
    boardMembers.find((boardMember) => boardMember.user === member._id) ? false : true
  );
  const dispatch = useDispatch();

  const handleValue = (newMember) => {
    setMember(newMember);
  };

  const handleInputValue = async (newInputValue) => {
    setInputValue(newInputValue);
    const search = (await axios.get(`/api/users/${inputValue}`)).data;
    setMembersWithRegex(search.length > 0 ? search : []);
  };

  const onSubmit = async () => {
    // dispatch(addMember(member._id));
    setMember(null);
    setInputValue('');
    setInviting(false);
  };

  return (
    <div className='board-members'>
      {boardMembers.map((member) => {
        let initials = member.name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return (
          <Tooltip title={member.name} key={member.user}>
            <Avatar className='avatar'>{initials}</Avatar>
          </Tooltip>
        );
      })}
      {!inviting ? (
        <Button className='invite' variant='outlined' onClick={() => setInviting(true)}>
          Invite
        </Button>
      ) : (
        <div className='invite'>
          <Autocomplete
            value={member}
            onChange={(e, newMember) => handleValue(newMember)}
            inputValue={inputValue}
            onInputChange={(e, newInputValue) => handleInputValue(newInputValue)}
            options={searchOptions}
            getOptionLabel={(member) => member.email}
            className='search-member'
            renderInput={(params) => (
              <TextField {...params} helperText='Search for member by email' autoFocus />
            )}
          />
          <Button
            disabled={!member}
            variant='contained'
            color='primary'
            onClick={onSubmit}
          >
            Add Member
          </Button>
          <Button onClick={() => setInviting(false)}>
            <CloseIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Members;
