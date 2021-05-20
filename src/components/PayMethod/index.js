import React, {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import "./index.scss";
import axios from "axios";


const PayMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    axios.get('/users/paymethods').then(res => {
      const paymentMethods = res.data.paymentMethods;
      setPaymentMethod(paymentMethods[0] || null);
    }).catch(e => {
    });
  }, []);

  const onFinish = (values: any) => {
    axios.post("/orders/billkey", values).then(res => {
      setPaymentMethod(res.data.userPayment);
    });
  };

  const onRegisterClicked = () => {
    setPaymentMethod(null);
  };

  const NewPaymentMethod = () => {
    return (
        <div className={"payment-method-wrapper"}>
          <div className={"card-img-wrapper"}></div>

          <Form
              name="basic"
              initialValues={{
              }}
              onFinish={onFinish}
          >
            <div className={"card-info-wrapper"}>
              <div className={"number-wrapper"}>
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
                    rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    확인
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
    )
  };

  const PaymentMethod = ({paymentMethod}) => {
    return (
        <div className={"payment-method-wrapper"}>
          <div className={"card-img-wrapper"}></div>

          <div className={"card-info-wrapper"}>
            <div className={"card-info"}>
              <div className={"label"}>
                카드번호
              </div>
              <div className={"v"}>
                ****-****-****-{paymentMethod.last_4_digit}
              </div>
            </div>
          </div>

          <div className={"register-btn"} onClick={onRegisterClicked}>
            등록/변경
          </div>
        </div>
    )
  };

  return (
      <div className={"payment-method-container"}>
        {
          paymentMethod == null ?
              <NewPaymentMethod />
              :
              <PaymentMethod paymentMethod={paymentMethod}/>
        }
      </div>
  );
};

export default PayMethod;
