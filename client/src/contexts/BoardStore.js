import React, {createContext, useReducer} from 'react'
import {boardReducer, boardState} from '../reducers/board'
import * as boardActions from '../actions/board'

export const BoardContext = createContext()

export default function BoardStore(props) {
    const [board, boardDispatch] = useReducer(boardReducer, boardState)

    const dispatchedActions = {
            getBoards: (...e) => boardActions.getBoards(...e)(boardDispatch),
            getBoard: (...e) => boardActions.getBoard(...e)(boardDispatch),
            addBoard: (...e) => boardActions.addBoard(...e)(boardDispatch),
            renameBoard: (...e) => boardActions.renameBoard(...e)(boardDispatch),
            getList: (...e) => boardActions.getList(...e)(boardDispatch),
            addList: (...e) => boardActions.addList(...e)(boardDispatch),
            renameList: (...e) => boardActions.renameList(...e)(boardDispatch),
            archiveList: (...e) => boardActions.archiveList(...e)(boardDispatch),
            getCard: (...e) => boardActions.getCard(...e)(boardDispatch),
            editCard: (...e) => boardActions.editCard(...e)(boardDispatch),
            moveCard: (...e) => boardActions.moveCard(...e)(boardDispatch),
            archiveCard: (...e) => boardActions.archiveCard(...e)(boardDispatch),
            deleteCard: (...e) => boardActions.deleteCard(...e)(boardDispatch),
            getActivity: (...e) => boardActions.getActivity(...e)(boardDispatch),
            addMember: (...e) => boardActions.addMember(...e)(boardDispatch),
            moveList: (...e) => boardActions.moveList(...e)(boardDispatch),
            addCardMember: (...e) => boardActions.addCardMember(...e)(boardDispatch),
            addChecklistItem: (...e) => boardActions.addChecklistItem(...e)(boardDispatch),
            editChecklistItem: (...e) => boardActions.editChecklistItem(...e)(boardDispatch),
            completeChecklistItem: (...e) => boardActions.completeChecklistItem(...e)(boardDispatch),
            deleteChecklistItem: (...e) => boardActions.deleteChecklistItem(...e)(boardDispatch)
        }
 
    const value = {board, ...dispatchedActions}
    
    return (
        <BoardContext.Provider value={{...value}}>
            {props.children}
        </BoardContext.Provider>
    )
 }