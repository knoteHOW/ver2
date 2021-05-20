import React, {useState, useEffect} from 'react';
import axios from "axios";
// import "./index.scss";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import {Button, Form, Input} from "antd";

const NewPaymentMethodPage = () => {
  const history = useHistory();

  const handledClick = (values) => {
    axios.post("/orders/billkey", values).then(res => {
      // history.push("/");
    }).catch((e) => {
    });
  };

  const onFinish = (values: any) => {
    handledClick(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <div className="container payment-method-container">

        <div className="formWrapper">
          <Form
              name="basic"
              initialValues={{ cardNumber: '', expiry: '', birth: '', pwd2Digit: '' }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
          >
            <Form.Item
                label="카드번호"
                name="cardNumber"
                rules={[{ required: true, message: '카드번호를 입력해 주세요.' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
                label="유효기간(MMYY)"
                name="expiry"
                rules={[{ required: true, message: '유효기간을 입력해 주세요.' }]}
            >
              <Input />
            </Form.Item>


            <Form.Item
                label="카드소지자 생년월일(6자리)"
                name="birth"
                rules={[{ required: true, message: '생년월일을 입력해주세요.' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
                label="비밀번호 앞 2자리"
                name="pwd2Digit"
                rules={[{ required: true, message: '학과를 입력해주세요.' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                확인
              </Button>
            </Form.Item>
          </Form>
        </div>

      </div>
  );
}

export default NewPaymentMethodPage;
