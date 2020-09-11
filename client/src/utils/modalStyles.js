import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  createBoardModal: {
    width: 400,
  },
  cardModal: {
    width: 800,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 400,
    },
  },
  cardTitle: {
    width: '100%',
  },
  button: {
    width: 180,
    marginTop: 10,
  },
  membersTitle: {
    margin: '20px 0 10px',
  },
  labelTitle: {
    margin: '20px 0 10px',
  },
  colorPicker: {
    minWidth: 212,
  },
  noLabel: {
    width: 100,
  },
  moveCardTitle: {
    marginTop: 20,
  },
  moveCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  moveCardSelect: {
    marginTop: 10,
    marginRight: 20,
    width: 200,
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
  },
  checklistItem: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    margin: '2px 0 5px',
  },
  checklistFormLabel: {
    width: '100%',
  },
  itemButtons: {
    display: 'flex',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  itemButton: {
    height: 40,
  },
  checklistBottom: {
    marginTop: 5,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    [theme.breakpoints.up('md')]: {
      top: '5%',
      maxHeight: '90vh',
    },
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalTop: {
    display: 'flex',
  },
  modalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    height: 'auto',
  },
  modalBottomRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  archiveButton: {
    marginBottom: 5,
  },
}));

export default useStyles;
