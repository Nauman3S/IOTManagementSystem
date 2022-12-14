import React, { useEffect, useCallback } from "react";
import { AnimationContainer, SvgContainer } from "./elements";
import SVG from "../../assets/images/smartoee.png";
import { loadProfile } from "../../Redux/actions/auth.actions";
import { getToken } from "../../Redux/localStorage";
import { useDispatch, useSelector } from "react-redux";
const Loading = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fetchProfile = useCallback(() => {
    const token = getToken();
    if (token && !authState.isSignedIn) {
      dispatch(loadProfile(token));
    }
  }, [authState.isSignedIn, dispatch]);
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  return (
    <AnimationContainer>
      <SvgContainer src={SVG} alt='' />
      <h2 style={{ fontWeight: "bold" }}> Smart IoT Management System</h2>
    </AnimationContainer>
  );
};

export default Loading;
