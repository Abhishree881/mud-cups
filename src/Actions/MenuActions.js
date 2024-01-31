export const addToMenu = (data) => {
    return function (dispatch) {
        dispatch({ type: 'ADD_TO_MENU', newMenuItem: data })
    }
}
export const loadMenu = (data) => {
    return function (dispatch) {
        dispatch({ type: 'LOAD_MENU', data })
    }
}