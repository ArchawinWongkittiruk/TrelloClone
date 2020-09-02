import { GET_BOARDS, GET_BOARD, ADD_BOARD, BOARD_ERROR } from '../actions/types';

const initialState = {
  boards: [],
  board: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BOARDS:
      return {
        ...state,
        boards: payload,
      };
    case GET_BOARD:
      return {
        ...state,
        board: payload,
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
    default:
      return state;
  }
}
