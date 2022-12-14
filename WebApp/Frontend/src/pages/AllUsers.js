import React from "react";
import { Row, Col, Card, Table, Button, Popconfirm, message } from "antd";

import { deleteUser, getAllUsers } from "../Axios/apiFunctions";

import { useQuery, useMutation, useQueryClient } from "react-query";

const AllUsers = () => {
  const { loading, data } = useQuery("getAllUsers", getAllUsers);

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(getAllUsers, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getAllUsers");
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "32%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Delete",
      key: "delete",
      render: (data) => (
        <>
          <Popconfirm
            title='Are you sure？'
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleDelete(data)}>
            <Button type='danger' className='tag-primary'>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const handleDelete = async (values) => {
    const res = await deleteUser(values._id);

    if (res.status === 200) {
      getDataMutation.mutate();
      message.success("User Deleted Successfully");
    } else {
      message.success(
        "Something went wrong, please check your internet connection!"
      );
    }
  };

  return (
    <>
      <div className='tabled'>
        <Row gutter={[24, 0]}>
          <Col xs='24' xl={24}>
            <Card
              bordered={false}
              className='criclebox tablespace mb-24'
              title='All Users'>
              <div className='table-responsive'>
                <Table
                  columns={columns}
                  dataSource={loading || data?.data?.users}
                  pagination={false}
                  className='ant-border-space'
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AllUsers;
