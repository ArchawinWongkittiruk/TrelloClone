import { GET_BOARDS, GET_BOARD, ADD_BOARD, BOARD_ERROR } from '../actions/types';

const initialState = {
  boards: [],
  board: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BOARDS:
      return {
        ...state,
        boards: payload,
        loading: false,
      };
    case GET_BOARD:
      return {
        ...state,
        board: payload,
        loading: false,
      };
    case ADD_BOARD:
      return {
        ...state,
        boards: [payload, ...state.boards],
        loading: false,
      };
    case BOARD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
