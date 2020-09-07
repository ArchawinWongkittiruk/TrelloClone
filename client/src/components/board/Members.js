import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';

const Members = () => {
  const members = useSelector((state) => state.board.board.members);

  return (
    <div className='board-members'>
      {members.map((member) => {
        let initials = member.name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return <Avatar>{initials}</Avatar>;
      })}
    </div>
  );
};

export default Members;
