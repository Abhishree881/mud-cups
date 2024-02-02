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
export const setItem = (newMenuItem, categoryIndex, itemIndex) => {
    return function (dispatch) {
        dispatch({ type: 'SET_ITEM', newMenuItem, categoryIndex, itemIndex })
    }
}
export const setFavourite = (categoryIndex, itemIndex) => {
    return function (dispatch) {
        dispatch({ type: 'SET_FAV', categoryIndex, itemIndex })
    }
}
export const setRecommended = (data) => {
    return function (dispatch) {
        dispatch({ type: 'SET_RECOMMENDED', recommendedData: data })
    }
}
