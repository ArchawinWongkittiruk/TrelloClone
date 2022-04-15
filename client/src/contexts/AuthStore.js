import React, {createContext, useReducer} from 'react'
import {authReducer, authState} from '../reducers/auth'
import {alertReducer, alertState} from '../reducers/alert'
import * as authActions from '../actions/auth'
import * as alertActions from '../actions/alert'

export const AuthContext = createContext()

export default function AuthStore(props) {
    const [auth, authDispatch] = useReducer(authReducer, authState)
    const [alert, alertDispatch] = useReducer(alertReducer, alertState)

    const dispatchedActions = {
            setAlert: (...e)=>alertActions.setAlert(...e)(alertDispatch),
            loadUser: (...e)=>authActions.loadUser(...e)(authDispatch),
            register: (...e)=>authActions.register(...e)(authDispatch),
            login: (...e)=>authActions.login(...e)(authDispatch),
            logout: (...e)=>authActions.logout(...e)(authDispatch)
        }
    
    const value = {auth, alert, ...dispatchedActions}

    return (
        <AuthContext.Provider value={{...value}}>
            {props.children}
        </AuthContext.Provider>
    )
 }