import {
  CLEAR_BOARD,
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  BOARD_ERROR,
  RENAME_BOARD,
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
  ADD_MEMBER,
  MOVE_LIST,
  ADD_CARD_MEMBER,
  ADD_CHECKLIST_ITEM,
  EDIT_CHECKLIST_ITEM,
  COMPLETE_CHECKLIST_ITEM,
  DELETE_CHECKLIST_ITEM,
} from '../actions/types';

export const boardState = {
  boards: [],
  board: null,
  dashboardLoading: true,
  error: {},
};

export function boardReducer(state = boardState, action) {
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
        board: { ...state.board, ...payload },
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
    case ARCHIVE_LIST:
    case RENAME_LIST:
      return {
        ...state,
        board: {
          ...state.board,
          listObjects: state.board.listObjects.map((list) =>
            list._id === payload._id ? payload : list
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
    case ADD_CHECKLIST_ITEM:
    case EDIT_CHECKLIST_ITEM:
    case COMPLETE_CHECKLIST_ITEM:
    case DELETE_CHECKLIST_ITEM:
    case ARCHIVE_CARD:
    case ADD_CARD_MEMBER:
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
            (card) => card._id !== payload.cardId || payload.to._id === payload.from._id
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
    case ADD_MEMBER:
      return {
        ...state,
        board: {
          ...state.board,
          members: payload,
        },
      };
    case MOVE_LIST:
      return {
        ...state,
        board: {
          ...state.board,
          lists: payload,
        },
      };
    default:
      return state;
  }
}
