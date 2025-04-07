import { setErrorMessage } from "./errors";

export const selectUser = (userId) => ({
  type: "SELECT_USER",
  payload: { id: userId },
});

export const fetchStart = () => ({
  type: "FETCH_START",
});

export const fetchFail = () => ({
  type: "FETCH_FAIL",
});

export const fetchSuccess = () => ({
  type: "FETCH_SUCCESS",
});

export const createUser =(user) => ({
  type: "CREATE_USER",
  payload: {user}
})


export const fetchUsersAsync = () => async (dispatch, getState) => {
  try {
    dispatch(fetchStart());
    const res = await fetch("https://api.github.com/users");

    if (!res.ok) {
      dispatch(fetchFail());
      const { message } = await res.json();
      throw new Error(message);
    }
    const data = await res.json();
    dispatch(fetchUsers(data));
    dispatch(fetchSuccess());
  } catch (e) {
    console.log(e.message);
    dispatch(fetchFail());
    dispatch(setErrorMessage(e.message));
  }
};

export const createUserAsync = (userData) => async (dispatch, getState) => {
  try {
    dispatch(fetchStart());
    const res = await fetch("http://localhost:5400/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      dispatch(fetchFail());
      const { message } = await res.json();
      throw new Error(message);
    }

    const data = await res.json();
    dispatch(fetchSuccess());
    dispatch(createUser(data));
    dispatch(setErrorMessage(""))
  } catch (e) {
    dispatch(fetchFail());  // If an error occurs, mark it as failed
    dispatch(setErrorMessage(e.message));  // Store the error message in state
  }
};
