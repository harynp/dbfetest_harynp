import axios from "axios";
import { useState, useEffect } from "react";
import {
  RadioChangeEvent,
  Form,
  Input,
  Row,
  Col,
  Radio,
  Button,
  Typography,
  Divider,
} from "antd";

// components
import TableAccount from "./components/Table";
import { AccountProps, FormListProps, listPaymentProps } from "./types";
const { Title } = Typography;
const { useForm } = Form;

// Config
const BASE_API_URL = "https://front-end-test-assignment.fintech-market.com";

// Setup
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
const config_auth = {
  auth: {
    username: process.env.REACT_APP_USERNAME || "",
    password: process.env.REACT_APP_PASSWORD || "",
  },
};

const App = () => {
  // State
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false); // loading for create new account into table
  const [isProceed, setIsProceed] = useState<boolean>(false); // loading for create new payment into table
  const [listAccount, setListAccount] = useState<Array<AccountProps>>([]);
  const [listPayment, setListPayment] = useState<Array<listPaymentProps>>([]);
  const [typePayment, setTypePayment] = useState<string>("internal");
  const [formList, setFormList] = useState<Array<FormListProps>>([
    { label: "Description", value: "description", required: false },
    { label: "Amount", value: "amount", required: true },
    {
      label: "Remitter Account ID",
      value: "remitter_account_id",
      required: true,
    },
    {
      label: "Beneficiary Account ID",
      value: "beneficiary_account_id",
      required: true,
    },
  ]);

  // Lifecycle
  useEffect(() => {
    setTypePayment("internal");
  }, [setListAccount, typePayment]);

  // Props Form
  const { resetFields, setFieldsValue } = form;

  // Data value table new user
  const data: AccountProps[] = listAccount;

  // Call API create new account
  const postCreateNewAccount = async (values: any) => {
    try {
      setIsLoading(true);
      console.log("AAA");
      const requestBody = {
        data: {
          name: values.newaccount,
        },
      };

      const {
        data: { data: response },
      } = await axios.post(
        BASE_API_URL + "/api/v1/accounts",
        requestBody,
        config_auth
      );
      if (!response) {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setListAccount((oldArray) => [...oldArray, response]);
      resetFields();
    } catch (err) {
      console.log(err);
    }
  };

  const postCreateNewPayment = async (values: any) => {
    try {
      setIsProceed(true);
      const payload = {
        data: values,
      };
      alert(JSON.stringify(payload));
      const {
        data: { data: response },
      } = await axios.post(
        BASE_API_URL + "/api/v1/payments",
        {
          data: values,
        },
        config_auth
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const choosePayment = (e: RadioChangeEvent) => {
    resetFields();
    setFieldsValue({ paymentType: e.target.value });
    setTypePayment(e.target.value);
    if (!e.target.value) {
      setTypePayment("internal");
      return;
    }

    switch (e.target.value) {
      case "internal":
        setFormList([
          { label: "Description", value: "description", required: false },
          { label: "Amount", value: "amount", required: true },
          {
            label: "Remitter Account ID",
            value: "remitter_account_id",
            required: true,
          },
          {
            label: "Beneficiary Account ID",
            value: "beneficiary_account_id",
            required: true,
          },
        ]);
        break;
      case "incoming":
        setFormList([
          { label: "Description", value: "description", required: false },
          { label: "Amount", value: "amount", required: true },
          {
            label: "Beneficiary Account ID",
            value: "beneficiary_account_id",
            required: true,
          },
          { label: "Remitter Name", value: "remitter_name", required: true },
          {
            label: "Remitter Account Number",
            value: "remitter_account_number",
            required: true,
          },
        ]);
        break;
      case "outcoming":
        setFormList([
          { label: "Description", value: "description", required: false },
          { label: "Amount", value: "amount", required: true },
          {
            label: "Remitter Account ID",
            value: "remitter_account_id",
            required: true,
          },
          {
            label: "Beneficiary Name",
            value: "beneficiary_name",
            required: true,
          },
          {
            label: "Beneficiary Account Number",
            value: "beneficiary_account_number",
            required: true,
          },
        ]);
        break;
    }
  };

  return (
    <div className="App">
      <Row style={{ margin: "20px 0 0 10px" }}>
        <Col span={11} style={{ height: "90vh" }}>
          <Col>
            <Title level={1}>Create New Account</Title>
            <Row>
              <Col span={12}>
                <Row>
                  <Form
                    form={form}
                    name="accountForm"
                    layout="vertical"
                    onFinish={postCreateNewAccount}
                  >
                    <Form.Item
                      label="New Account"
                      name="newaccount"
                      rules={[
                        { required: true, message: "Name is required" },
                        {
                          min: 3,
                          message: "Minimum 3 characters.",
                        },
                      ]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                      <Button type="primary" htmlType="submit">
                        Create
                      </Button>
                    </Form.Item>
                  </Form>
                </Row>
              </Col>
            </Row>
            <TableAccount dataSources={data} loading={isLoading} />
          </Col>
        </Col>
        <Col span={1}>
          <Divider style={{ height: "100%" }} type="vertical" />
        </Col>

        <Col span={12}>
          <Title level={1}>Create Payment</Title>
          <Form
            name="paymentForm"
            layout="vertical"
            onFinish={postCreateNewPayment}
          >
            <Form.Item label="Payment Type" name="paymentType">
              <Radio.Group onChange={choosePayment}>
                <Radio.Button value="internal">Internal</Radio.Button>
                <Radio.Button value="incoming">Incoming</Radio.Button>
                <Radio.Button value="outcoming">Outcoming</Radio.Button>
              </Radio.Group>
            </Form.Item>
            {formList.map((list, idx) => {
              return (
                <Form.Item
                  key={`${idx}--${list.value}`}
                  label={list.label}
                  name={list.value}
                  required={list.required}
                >
                  <Input placeholder={list.label} />
                </Form.Item>
              );
            })}
            <Form.Item shouldUpdate>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default App;
