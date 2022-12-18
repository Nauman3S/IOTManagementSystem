import server from "./index";

import { getToken } from "../Redux/localStorage";

export const updateUser = (values) =>
  server.patch("/auth/update-user", values, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getCounts = () =>
  server.get("/admin/count", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getAllUsers = () =>
  server.get("/admin/all-users", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const deleteUser = (id) =>
  server.patch(
    "/admin/delete-user",
    { id: id },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const addMacAddress = (macAddress) =>
  server.patch(
    "/macAddress/add",
    { macAddress },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const getAllMacAddress = () =>
  server.get("/macAddress/all", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const removeMacAddress = (macAddress, userId) =>
  server.patch(
    "/macAddress/remove",
    { macAddress, userId },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const clientDashboardCount = () =>
  server.get("/count/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const forgotPassword = (email) => server.post("/auth/forgot", { email });

export const verifyOTP = (email, code) =>
  server.post("/auth/verify", { email, code });

export const resetPassword = (email, password) =>
  server.post("/auth/reset", { email, password });

export const getAdminUserAllMacAddress = () =>
  server.get("/admin/all-macAddress", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getDataByMacAddress = (query) => server.post("/mqtt/data", query);

export const getEnerygyCost = () =>
  server.get("/energy", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const addEnergyCost = (energyCost) =>
  server.patch("/energy", energyCost, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const uploadFile = (file) =>
  server.post("/mqtt/file/upload", file, {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const getAllFiles = (query) =>
  server.post("/mqtt/files", query, {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const deleteFile = async (Key) => {
  return await server.delete(`/mqtt/file/delete/${Key}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const publishToMqtt = (file) =>
  server.post(`/mqtt/publish`, file, {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const allPrograms = (macAddress) =>
  server.post(
    "/program/all",
    { macAddress },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const addProgram = (values) =>
  server.post("/program/post", values, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const deleteProgram = (id) =>
  server.patch(
    `/program/delete`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const editProgram = (data, id) =>
  server.patch(
    `/program/edit`,
    { id: id, programName: data.programName, command: data.command },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const allUrls = (macAddress) =>
  server.post(
    "/url/all",
    { macAddress },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const addUrl = (values) =>
  server.post("/url/post", values, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const deleteUrl = (id) =>
  server.patch(
    `/url/delete`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const editUrl = (data, id) =>
  server.patch(
    `/url/edit`,
    { id: id, url: data.url },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
