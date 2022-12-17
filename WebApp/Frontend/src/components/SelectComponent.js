import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useQuery } from "react-query";
import {
  getAllMacAddress,
  getAdminUserAllMacAddress,
} from "../Axios/apiFunctions";
import { useSelector } from "react-redux";

const SelectComponent = ({ setSelectedMacaddress, page }) => {
  const [macList, setMacList] = useState();

  const authState = useSelector((state) => state.auth);
  const { data, loading } = useQuery(
    authState?.role === "client"
      ? "getAllMacAddress"
      : "getAdminUserAllMacAddress",
    authState?.role === "client" ? getAllMacAddress : getAdminUserAllMacAddress
  );
  useEffect(() => {
    if (!loading) {
      if (authState?.role === "admin") {
        setMacList(data?.data?.macAddressess);
      }
      if (authState?.role === "client") {
        setMacList(data?.data?.macAddressess?.macAddress);
      }
    }
  }, [loading, data?.data?.macAddressess, authState?.role]);

  const { Option } = Select;

  const selectOptions =
    !loading &&
    macList?.map((data, index) => {
      return (
        <Option
          key={`${index}`}
          value={
            authState.role === "admin"
              ? data.macAddress.macAddress
              : data.macAddress
          }>
          {authState.role === "admin"
            ? data.macAddress.macAddress
            : data.macAddress}
        </Option>
      );
    });

  selectOptions?.unshift(
    <Option key={`all`} value={"All"}>
      All
    </Option>
  );

  return (
    <Select
      defaultValue={"Select MacAddress"}
      style={{
        width: "15%",
        height: "25%",
        border: "1px solid black",
      }}
      onChange={(value) => {
        setSelectedMacaddress(value);
      }}>
      {!loading && selectOptions}
    </Select>
  );
};

export default SelectComponent;
