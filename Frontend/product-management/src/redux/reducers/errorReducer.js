const initialState = {
    message: ""
  };

  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case "SET_ERROR":
        return { ...state, message: action.payload };
      case "FLUSH_ERRORS":
        return { ...state, message: "" };
      default:
        return state;
    }
  }
