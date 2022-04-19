import {useContext, useState} from 'react';
import { BoardContext } from '../../contexts/BoardStore';

import PropTypes from 'prop-types';
import { Checkbox, FormGroup, FormControlLabel, FormControl } from '@material-ui/core';
import useStyles from '../../utils/modalStyles';
import { useEffect } from 'react';

const CardMembers = ({ card }) => {
  const { board: {board: {members}}, addCardMember } = useContext(BoardContext);

  const [cardMembers, setMembers] = useState(card.members.map((member) => member.user));

  const classes = useStyles();

  const addMember = async (e) => {
    addCardMember({
      add: e.target.checked,
      cardId: card._id,
      userId: e.target.name,
    })
  }
  const visualMemberHandler = (member) => {
    let foundMember = cardMembers.find((memberId) => memberId === member)
    setMembers(foundMember ? cardMembers.filter((memberId) => memberId !== member) : cardMembers.concat(member))
  }

  return (
    <div>
      <h3 className={classes.membersTitle}>Members</h3>
      <FormControl component='fieldset'>
        <FormGroup>
          {members.map((member) => (
            <FormControlLabel
              key={member.user}
              control={
                <Checkbox
                  checked={cardMembers.indexOf(member.user) !== -1}
                  onChange={(e) =>{
                    visualMemberHandler(member.user)
                    addMember(e)
                  }}
                  name={member.user}
                />
              }
              label={member.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

CardMembers.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardMembers;
