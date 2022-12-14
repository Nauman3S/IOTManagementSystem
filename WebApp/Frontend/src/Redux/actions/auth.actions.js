import { SIGN_UP, SIGN_IN, LOAD_PROF, SIGN_OUT } from "../types";
import server from "../../Axios/index";
import { notification } from "antd";
import { QueryCache } from "react-query";

import { saveToken, deleteToken } from "../localStorage";

export const signUp = (formValues) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/auth/signup", formValues);
      if (res.status === 200) {
        notification["success"]({
          message: "Sign Up Successfull",
        });
      }
      dispatch({ type: SIGN_UP });
    } catch (error) {
      notification["error"]({
        message: error?.response?.data?.message,
      });
      console.log(error);
      return error;
    }
  };
};

export const signIn = (formValues) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/auth/login", formValues);
      if (res.status === 200) {
        saveToken(res.data.token);

        dispatch({ type: SIGN_IN, payload: res.data });
      }
    } catch (error) {
      if (error.response.status === 500) {
        notification["error"]({
          message: `${error.response.data.message}`,
        });
      }
      console.log(error.response);
    }
  };
};

export const loadProfile = (token) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/auth/my-profile", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      dispatch({ type: LOAD_PROF, payload: res.data.user });
    } catch (error) {
      console.log(error);
    }
  };
};

export const signOut = () => {
  const queryCache = new QueryCache();
  queryCache.clear();
  deleteToken();
  return { type: SIGN_OUT };
};
