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
      const { newMenuItem, categoryIndex, itemIndex } = action;
      const updatedMenu = state.menu.map((category, index) => {
        if (index === categoryIndex) {
          const updatedItems = category.items.map((item, i) => {
            if (i === itemIndex) {
              return newMenuItem;
            }
            return item;
          });
          return { ...category, items: updatedItems };
        }
        return category;
      });
      return { ...state, menu: updatedMenu };

    case "SET_FAV":
      if (
        state.menu[action.categoryIndex].items[action.itemIndex].isFavourite
      ) {
        return Object.assign({}, state, {
          favourites: [
            ...state.favourites,
            state.menu[action.categoryIndex].items[action.itemIndex],
          ],
        });
      } else {
        const updatedFavourites = state.favourites.filter((item) => {
          return (
            item.name !==
            state.menu[action.categoryIndex].items[action.itemIndex].name
          );
        });
        return Object.assign({}, state, {
          favourites: updatedFavourites,
        });
      }

    default:
      return state;
  }
};
export default menuReducer;
