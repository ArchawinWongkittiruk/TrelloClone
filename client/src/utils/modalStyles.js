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
    width: 650,
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
    minWidth: 220,
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
    minHeight: '100%',
  },
  moveCardSelect: {
    marginTop: 10,
    marginRight: 20,
    width: 200,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '5%',
    left: '50%',
    transform: 'translateX(-50%)',
    maxHeight: '90vh',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '80vh',
    },
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
