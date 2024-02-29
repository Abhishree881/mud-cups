import { fetchFranchiseDatabase } from "./AdminDatabase";

export const fetchFranchises = () => {
  return async (dispatch) => {
    const data = await fetchFranchiseDatabase();
    dispatch({
      type: "SET_FRANCHISES",
      data,
    });
    return data;
  };
};
