import React from "react";
import { Form, Modal, Button, Input } from "antd";

const ModalComponent = ({
  visible,
  setVisible,
  loading,
  onFinish,
  title,
  initialValues,
}) => {
  let val = { min: 0, max: 0 };

  if (visible === true && initialValues?.length > 0) {
    val = initialValues?.find((data) => {
      if (data.sensorName === title.name) {
        return { min: data.min, max: data.max };
      }
    });
  }

  return (
    <Modal
      title={`Set Alarms for ${title?.name}`}
      destroyOnClose={true}
      open={visible}
      width={"60%"}
      footer={null}
      onCancel={() => setVisible(false)}
      confirmLoading={loading}>
      <Form
        name='control-ref'
        onFinish={onFinish}
        initialValues={{
          min: val?.min ? val?.min : 0,
          max: val?.max ? val?.max : 0,
        }}
        labelCol={{
          span: 8,
        }}>
        <Form.Item
          name='min'
          label={`Min ${title?.name} Value`}
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='max'
          label={`Max ${title?.name} Value`}
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type='primary' htmlType='submit' loading={loading}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
