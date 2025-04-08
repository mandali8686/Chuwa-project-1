import { setErrorMessage } from "./errors";

export const fetchCurUser = (user) => (
  {
    type: "FETCH_CUR_USER",
    payload: { user}
  }
);
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


export const fetchUsersAsync = ({ email, password }) => async (dispatch, getState) => {
  try {
    dispatch(fetchStart());
    const res = await fetch("http://localhost:5400/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      dispatch(fetchFail());
      const { message } = await res.json();
      throw new Error(message);
    }

    const data = await res.json();
    dispatch(fetchCurUser(data));
    dispatch(fetchSuccess());

    // Add JWT token and user data to localStorage
    localStorage.setItem("jwtToken", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

  } catch (e) {
    dispatch(fetchFail());
    dispatch(setErrorMessage(e.message));
    throw new Error(e.message)
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
    dispatch(setErrorMessage(e.message));
    throw new Error(e.message)
  }
};
