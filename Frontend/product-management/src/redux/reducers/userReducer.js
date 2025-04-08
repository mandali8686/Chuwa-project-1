const initialState = {
  users: [],
  cur_user: null,
  status: "idle"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CUR_USER":
      return {
        ...state,
        cur_user: action.payload
      };
    case "SELECT_USER":
      return {
        ...state,
        cur_user: state.users.find((user) => user.id === action.payload.id),
      };
    case "CREATE_USER":
      return {
        ...state,
        cur_user: action.payload
      };
    case "FETCH_START":
      return {
        ...state,
        status: "pending",
      };
    case "FETCH_FAIL":
      return {
        ...state,
        status: "failed",
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        status: "succeeded",
      };
    default:
      return state;
  }
}
