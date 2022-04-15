import React, {useContext} from 'react';
import { BoardContext } from '../../contexts/BoardStore';

import PropTypes from 'prop-types';
import { Checkbox, FormGroup, FormControlLabel, FormControl } from '@material-ui/core';
import useStyles from '../../utils/modalStyles';

const CardMembers = ({ card }) => {
  const { board: {board: {members}}, addCardMember } = useContext(BoardContext);

  const cardMembers = card.members.map((member) => member.user)

  const classes = useStyles();

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
                  onChange={async (e) =>
                      addCardMember({
                        add: e.target.checked,
                        cardId: card._id,
                        userId: e.target.name,
                      })
                  }
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
