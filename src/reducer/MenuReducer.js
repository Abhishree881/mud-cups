const initialState = {
  menu: [],
  recommended: [],
  favourites: [],
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_MENU":
      return Object.assign({}, state, {
        menu: [...state.menu, action.newMenuItem],
      });
    case "LOAD_MENU":
      return Object.assign({}, state, {
        menu: action.data,
      });
    case "SET_RECOMMENDED":
      return Object.assign({}, state, {
        recommended: action.recommendedData,
      });
    case "SET_ITEM":
      const { newMenuItem, itemIndex } = action;
      const updatedMenu = state.menu.map(menuItem => {
        if (menuItem.items) {
          const updatedItems = menuItem.items.map(item => {
            if (item.itemIndex === itemIndex) {
              return newMenuItem;
            }
            return item;
          });
          return { ...menuItem, items: updatedItems };
        }
        return menuItem;
      });
      return { ...state, menu: updatedMenu };

    case "SET_FAV":
      const IIndex = action.itemIndex;
      let newFavItem = null
      let removeIndex = null
      const newMenu = state.menu.map(menuItem => {
        if (menuItem.items) {
          const updatedItems = menuItem.items.map(item => {
            if (item.itemIndex === IIndex) {
              if (item.isFavourite) {
                removeIndex = IIndex
              }
              else {
                newFavItem = { ...item, isFavourite: !item.isFavourite }
              }
              return { ...item, isFavourite: !item.isFavourite };
            }
            return item;
          });
          return { ...menuItem, items: updatedItems };
        }
        return menuItem;
      });
      let newFav = [];
      if (removeIndex !== null) {
        // Filter out the item with the matching removeIndex
        newFav = state.favourites.filter(item => item.itemIndex !== removeIndex);
      } else {
        // Append newFavItem to newFav array
        newFav = [...state.favourites, newFavItem];
      }


      return { ...state, menu: newMenu, favourites: newFav };
    default:
      return state;
  }
};
export default menuReducer;
