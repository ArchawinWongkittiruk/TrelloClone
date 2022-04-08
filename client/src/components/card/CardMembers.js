import React from 'react';
import PropTypes from 'prop-types';
import { addCardMember } from '../../actions/board';
import { Checkbox, FormGroup, FormControlLabel, FormControl } from '@material-ui/core';
import useStyles from '../../utils/modalStyles';
import withStore from '../../Store/withStore';

const CardMembers = withStore(['board'], ({store, props}) => {
  const { card } = props;
  const { state, dispatch } = store

  const boardMembers = state.boardState.board.members
  const members = card.members.map((member) => member.user);

  const classes = useStyles();

  return (
    <div>
      <h3 className={classes.membersTitle}>Members</h3>
      <FormControl component='fieldset'>
        <FormGroup>
          {boardMembers.map((member) => (
            <FormControlLabel
              key={member.user}
              control={
                <Checkbox
                  checked={members.indexOf(member.user) !== -1}
                  onChange={async (e) =>
                    dispatch(
                      addCardMember({
                        add: e.target.checked,
                        cardId: card._id,
                        userId: e.target.name,
                      })
                    )
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
});

CardMembers.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardMembers;
