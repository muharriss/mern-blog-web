const initialState = {
    name: 'muharriss'
}

const globalReducer = (state = initialState, action) => {
    if (action.type === 'UPDATE_NAME') {
        return {
            ...state,
            name: 'haris'
        }
    }
    return state
}

export default globalReducer