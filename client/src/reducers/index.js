import alert, {alertState} from './alert';
import auth, {authState} from './auth';
import board, {boardState} from './board';

export const reducers = { alert, auth, board }
export const states = { alertState, authState, boardState }