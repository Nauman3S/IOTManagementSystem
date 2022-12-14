export const getToken = () => {
  try {
    const serializedState = localStorage.getItem("token");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveToken = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("token", serializedState);
  } catch (err) {}
};

export const deleteToken = () => {
  try {
    localStorage.removeItem("token");
  } catch (e) {}
};
