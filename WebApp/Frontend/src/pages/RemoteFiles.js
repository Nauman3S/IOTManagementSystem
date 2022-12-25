import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Upload,
  notification,
  Popconfirm,
  message,
  Tooltip,
} from "antd";
import SelectComponent from "../components/SelectComponent";
import { AppstoreAddOutlined, UploadOutlined } from "@ant-design/icons";
import {
  uploadFile,
  deleteFile,
  getAllFiles,
  publishToMqtt,
} from "../Axios/apiFunctions";
import { useQuery, useMutation, useQueryClient } from "react-query";
import MqttComponent from "../components/MqttComponent";

const RemoteFiles = ({ socket }) => {
  const [selectedMacaddress, setSelectedMacaddress] = useState();
  const [uploading, setUploading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState();

  const { data, isLoading: dataLoading } = useQuery(
    ["getAllFiles", selectedMacaddress],
    () =>
      selectedMacaddress &&
      getAllFiles(
        selectedMacaddress === "All"
          ? { query: { type: "url" } }
          : { query: { macAddress: selectedMacaddress, type: "url" } }
      )
  );

  const queryClient = useQueryClient();

  const getDataMutation = useMutation(getAllFiles, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getAllFiles", selectedMacaddress]);
    },
  });

  const columns = [
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "URL",
      dataIndex: "fileURL",
      key: "fileURL",
      render: (data) => {
        return (
          <Tooltip title={data} placement='bottom'>
            {data.slice(0, 70) + "...."}
          </Tooltip>
        );
      },
    },
    {
      title: "Publish",
      key: "run",
      width: "1%",
      render: (data) => (
        <>
          <Button
            type='primary'
            className='tag-primary'
            onClick={() => {
              hanldePublish(data);
            }}>
            Publish
          </Button>
        </>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (data) => (
        <>
          <Popconfirm
            title='Are you sure to delete this file?'
            onConfirm={() => {
              handleDeleteFile(data.key);
            }}
            okButtonProps={{
              style: { backgroundColor: "#1890ff", color: "white" },
            }}
            okText='Yes'
            cancelText='No'>
            <Button
              loading={uploading}
              style={{ backgroundColor: "red", color: "white" }}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const hanldePublish = async (data) => {
    try {
      const urlFileEndPoint = `client/url/${
        selectedMacaddress === "All" ? "all" : selectedMacaddress
      }`;
      const formDataUrl = new FormData();
      formDataUrl.append("message", data.fileURL);
      formDataUrl.append("endPoint", urlFileEndPoint);

      const res = await publishToMqtt(formDataUrl);

      if (res.status === 200) {
        message.success(`${data.fileName} Published`);
      }
    } catch (error) {
      message.error(
        `Something went wrong, please check your internet connection`
      );
    }
  };
  const handleDeleteFile = async (key) => {
    setUploading(true);

    try {
      const res = await deleteFile(key);

      if (res.status === 200) {
        getDataMutation.mutate();
        setUploading(false);

        notification["success"]({
          message: "File Deleted ",
        });
      }
    } catch (error) {
      setUploading(false);

      notification["error"]({
        message: "Something went wrong! Please check your internet connection",
      });
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    setUploading(true);
    setFile(null);
    formData.append("file", file);
    formData.append("macAddress", selectedMacaddress);
    formData.append("type", "url");
    try {
      const res = await uploadFile(formData);

      if (res.status === 200) {
        getDataMutation.mutate();

        await publishToMqtt(formData);

        const urlFileEndPoint = `client/url/${
          selectedMacaddress === "All" ? "all" : selectedMacaddress
        }`;
        const formDataUrl = new FormData();
        formDataUrl.append("message", res.data.data.fileURL);
        formDataUrl.append("endPoint", urlFileEndPoint);

        await publishToMqtt(formDataUrl);

        notification["success"]({
          message: "File Uploaded Successfully!",
        });
        setUploading(false);
        setIsModalVisible(false);
      }
    } catch (error) {
      setUploading(false);
      setIsModalVisible(false);
      setFile(null);
      notification["error"]({
        message: "Something went wrong! Please check your internet connection",
      });
    }
  };

  const beforeUpload = (file, fileList) => {
    setFile(file);
    return false;
  };

  const onClickUploadFile = () => {
    if (!selectedMacaddress) {
      notification["error"]({
        message: "Please Select Macaddress First",
      });
      return;
    }
    setIsModalVisible(true);
  };

  return (
    <>
      <Card
        bordered={false}
        className='criclebox tablespace mb-24'
        extra={
          <>
            {
              <Button
                type='primary'
                className='tag-primary'
                onClick={onClickUploadFile}>
                Upload File
              </Button>
            }
          </>
        }
        title={
          <>
            <h3>Remote Files</h3>
            <SelectComponent setSelectedMacaddress={setSelectedMacaddress} />
          </>
        }>
        <div className='table-responsive'>
          <Table
            className='ant-border-space'
            columns={columns}
            dataSource={!dataLoading && data?.data?.files}
            pagination={true}
          />
        </div>
      </Card>
      <Modal
        title='Upload File'
        open={isModalVisible}
        destroyOnClose
        onCancel={() => setIsModalVisible(false)}
        footer={null}>
        <div style={{ textAlign: "center" }}>
          <Upload
            showUploadList={true}
            beforeUpload={beforeUpload}
            // onRemove={onRemove}
          >
            <Button
              icon={<AppstoreAddOutlined />}
              style={{
                marginTop: "5vh",
                width: "100%",
                backgroundColor: "#1890ff",
                color: "white",
              }}>
              Select File
            </Button>
          </Upload>

          <Button
            onClick={handleUpload}
            loading={uploading}
            disabled={!file ? true : false}
            icon={<UploadOutlined />}
            style={{
              marginTop: "5vh",
              width: "100%",
              backgroundColor: "#1890ff",
              color: "white",
            }}>
            <span className='btn-inner--text'>
              {uploading ? "Uploading" : "Upload File"}
            </span>
          </Button>
        </div>
      </Modal>
      <MqttComponent socket={socket} selectedMacaddress={selectedMacaddress} />
    </>
  );
};
export default RemoteFiles;
