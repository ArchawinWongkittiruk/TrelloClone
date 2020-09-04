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
    case RENAME_LIST: {
      const index = state.board.listObjects.findIndex((list) => list._id === payload._id);
      const newListObjects = [...state.board.listObjects];
      newListObjects[index].title = payload.title;

      return {
        ...state,
        board: {
          ...state.board,
          listObjects: newListObjects,
        },
      };
    }
    case ARCHIVE_LIST: {
      const index = state.board.listObjects.findIndex((list) => list._id === payload._id);
      const newListObjects = [...state.board.listObjects];
      newListObjects[index].archived = payload.archived;

      return {
        ...state,
        board: {
          ...state.board,
          listObjects: newListObjects,
        },
      };
    }
    default:
      return state;
  }
}
