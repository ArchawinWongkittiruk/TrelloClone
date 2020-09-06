import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  createBoardModal: {
    width: 400,
  },
  cardModal: {
    width: 800,
  },
  cardTitle: {
    width: 650,
  },
  button: {
    width: 180,
    marginTop: 10,
  },
  moveCardTitle: {
    marginTop: 50,
  },
  moveCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  moveCardSelect: {
    marginTop: 20,
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
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalTop: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  modalBottom: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  modalBottomRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  archiveButton: {
    marginBottom: 5,
  },
}));

export default useStyles;
