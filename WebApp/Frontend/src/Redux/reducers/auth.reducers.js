import { SIGN_OUT, SIGN_UP, SIGN_IN, LOAD_PROF } from "../types";

const INITIAL_STATE = {
  isSignedIn: false,
  userId: "",
  fullName: "",
  email: "",
  role: "",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state };
    case SIGN_IN:
      const { fullName, email, role, _id } = action.payload;
      return {
        ...state,
        isSignedIn: true,
        fullName: fullName,
        email: email,
        role: role,
        userId: _id,
      };
    case LOAD_PROF:
      return {
        ...state,
        isSignedIn: true,
        fullName: action.payload.fullName,
        email: action.payload.email,
        role: action.payload.role,
        userId: action.payload.userId,
      };

    case SIGN_OUT:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
};

export default authReducer;
