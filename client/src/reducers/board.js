import {
  CLEAR_BOARD,
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  BOARD_ERROR,
  RENAME_BOARD,
  GET_LISTS,
  GET_LIST,
  ADD_LIST,
  RENAME_LIST,
  ARCHIVE_LIST,
  GET_CARD,
  ADD_CARD,
  EDIT_CARD,
  MOVE_CARD,
  ARCHIVE_CARD,
  DELETE_CARD,
  GET_ACTIVITY,
} from '../actions/types';

const initialState = {
  boards: [],
  board: null,
  dashboardLoading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_BOARD:
      return {
        ...state,
        board: null,
      };
    case GET_BOARDS:
      return {
        ...state,
        boards: payload,
        dashboardLoading: false,
      };
    case RENAME_BOARD:
    case GET_BOARD:
      return {
        ...state,
        board: { ...payload, ...state.board },
      };
    case ADD_BOARD:
      return {
        ...state,
        boards: [payload, ...state.boards],
      };
    case BOARD_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_LISTS:
      return {
        ...state,
        board: {
          ...state.board,
          listObjects: payload,
        },
      };
    case GET_LIST:
      return {
        ...state,
        board: {
          ...state.board,
          listObjects: [...state.board.listObjects, payload],
        },
      };
    case ADD_LIST:
      return {
        ...state,
        board: {
          ...state.board,
          lists: [...state.board.lists, payload._id],
        },
      };
    case RENAME_LIST:
      return {
        ...state,
        board: {
          ...state.board,
          listObjects: state.board.listObjects.map((list) =>
            list._id === payload._id ? { ...list, title: payload.title } : list
          ),
        },
      };
    case ARCHIVE_LIST:
      return {
        ...state,
        board: {
          ...state.board,
          listObjects: state.board.listObjects.map((list) =>
            list._id === payload._id ? { ...list, archived: payload.archived } : list
          ),
        },
      };
    case GET_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          cardObjects: [...state.board.cardObjects, payload],
        },
      };
    case ADD_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          listObjects: state.board.listObjects.map((list) =>
            list._id === payload.listId
              ? { ...list, cards: [...list.cards, payload.cardId] }
              : list
          ),
        },
      };
    case EDIT_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          cardObjects: state.board.cardObjects.map((card) =>
            card._id === payload._id ? payload : card
          ),
        },
      };
    case MOVE_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          listObjects: state.board.listObjects.map((list) =>
            list._id === payload.from._id
              ? payload.from
              : list._id === payload.to._id
              ? payload.to
              : list
          ),
          cardObjects: state.board.cardObjects.filter(
            (card) => card._id !== payload.cardId || payload.to === payload.from
          ),
        },
      };
    case ARCHIVE_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          cardObjects: state.board.cardObjects.map((card) =>
            card._id === payload._id ? { ...card, archived: payload.archived } : card
          ),
        },
      };
    case DELETE_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          cardObjects: state.board.cardObjects.filter((card) => card._id !== payload),
          listObjects: state.board.listObjects.map((list) =>
            list.cards.includes(payload)
              ? { ...list, cards: list.cards.filter((card) => card !== payload) }
              : list
          ),
        },
      };
    case GET_ACTIVITY:
      return {
        ...state,
        board: {
          ...state.board,
          activity: payload,
        },
      };
    default:
      return state;
  }
}
