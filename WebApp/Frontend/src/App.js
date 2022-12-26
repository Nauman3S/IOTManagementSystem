import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/layout/Main";
import Loading from "./components/loadingComponent";
import { notification } from "antd";
import { getToken } from "./Redux/localStorage";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import io from "socket.io-client";

// const socket = io("http://localhost:3500");
const socket = io(
  "https://smart-iot-management-system-backend.prod.dev-pci.com"
);
socket.on("connect", () => {
  console.log(socket.id);
});

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = getToken();
  if (!isAuthenticated) {
    notification["error"]({
      message: "Please login first",
    });
  }

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

function LoggedIn({ children, redirectTo }) {
  let isAuthenticated = getToken();
  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
}

const App = () => {
  const authState = useSelector((state) => state.auth);

  const LazyClientHome = lazy(() => import("./pages/ClientHome"));

  const LazySignIn = lazy(() => import("./pages/SignIn"));
  const LazyProfile = lazy(() => import("./pages/Profile"));

  const LazyMacAddress = lazy(() => import("./pages/MacAddress"));
  const LazyFiles = lazy(() => import("./pages/Files"));
  const LazyScripts = lazy(() => import("./pages/Script"));
  const LazyDeviceInfo = lazy(() => import("./pages/DeviceInfo"));
  const LazyAllUsers = lazy(() => import("./pages/AllUsers"));
  const LazyClientFirmware = lazy(() => import("./pages/ClientFirmware"));
  const LazyDeviceFirmware = lazy(() => import("./pages/DeviceFirmware"));
  const LazyRemoteFiles = lazy(() => import("./pages/RemoteFiles"));

  return (
    <Suspense fallback={<Loading />}>
      <div className='App'>
        <AnimatePresence exitBeforeEnter>
          <Routes>
            <Route
              path='/sign-in'
              element={
                <LoggedIn redirectTo='/'>
                  <LazySignIn />
                </LoggedIn>
              }
            />
            <Route
              path='/'
              element={
                <RequireAuth redirectTo='/sign-in'>
                  <Main />
                </RequireAuth>
              }>
              <Route
                index
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    <LazyClientHome socket={socket} />
                  </RequireAuth>
                }
              />

              {authState?.role && authState?.role === "admin" && (
                <Route
                  path='/users'
                  element={
                    <RequireAuth redirectTo='/users'>
                      <LazyAllUsers />
                    </RequireAuth>
                  }
                />
              )}
              <Route
                path='/macaddress'
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    <LazyMacAddress />
                  </RequireAuth>
                }
              />
              <Route
                path='/files'
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    <LazyFiles socket={socket} />
                  </RequireAuth>
                }
              />
              <Route
                path='/remote-files'
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    <LazyRemoteFiles socket={socket} />
                  </RequireAuth>
                }
              />
              <Route
                path='/client-firmware'
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    <LazyClientFirmware type={"client"} socket={socket} />
                  </RequireAuth>
                }
              />

              <Route
                path='/device-firmware'
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    <LazyDeviceFirmware type={"firmware"} socket={socket} />
                  </RequireAuth>
                }
              />

              <Route
                path='/scripts'
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    <LazyScripts socket={socket} />
                  </RequireAuth>
                }
              />

              <Route
                path='/device-info'
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    <LazyDeviceInfo socket={socket} />
                  </RequireAuth>
                }
              />

              <Route
                path='/profile'
                element={
                  <RequireAuth redirectTo='/sign-in'>
                    <LazyProfile />
                  </RequireAuth>
                }
              />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </Suspense>
  );
};

export default App;
