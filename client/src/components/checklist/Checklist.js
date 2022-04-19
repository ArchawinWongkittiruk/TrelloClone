import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import CreateChecklistItem from './CreateChecklistItem';
import ChecklistItem from './ChecklistItem';
import { FormGroup, FormControl } from '@material-ui/core';
import useStyles from '../../utils/modalStyles';

const Checklist = ({ card }) => {
  const classes = useStyles();

  const [checklist, setChecklist] = useState(card.checklist);

  return (
    <Fragment>
      <h3 className={classes.header}>Checklist</h3>
      <FormControl component='fieldset'>
        <FormGroup>
          {checklist.map((item) => (
            <ChecklistItem key={item._id} item={item} card={card} updateList={setChecklist} list={checklist}/>
          ))}
        </FormGroup>
      </FormControl>
      <CreateChecklistItem cardId={card._id} updateList={setChecklist} list={checklist}/>
    </Fragment>
  );
};

Checklist.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Checklist;
