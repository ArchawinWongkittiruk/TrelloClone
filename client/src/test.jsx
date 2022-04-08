import withStore from "./Store/withStore"
import { getBoards } from "./actions/board"

export const Test = withStore(['auth', 'board'], ({store, props}) => {
    const {state, dispatch} = store
console.log(state)
    return (
        <div>
            <h1>Test</h1>
            <p>Props: {JSON.stringify(props)}</p>
            <p>State: {JSON.stringify(state)}</p>
            <button onClick={()=>dispatch(getBoards())}>dispatch</button>
        </div>
    )
})