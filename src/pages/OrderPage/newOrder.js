import React, {useState, useEffect} from 'react';
import axios from "axios";
// import "./index.scss";
import { useHistory, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
import {Button, Form, Select, Radio } from "antd";
const { Option } = Select;

const NewOrder = () => {
  const [coursePage, setCoursePage] = useState(null);
  const [course, setCourse] = useState(null);
  const [department, setDepartment] = useState(null);
  const [school, setSchool] = useState(null);
  const [paymethods, setPaymethods] = useState([]);

  useEffect(() => {
    axios.get(`/course_pages/${coursePageId}`).then(res => {
      setCoursePage(res.data);
      setSchool(res.data.course.department.school);
      setDepartment(res.data.course.department);
      setCourse(res.data.course);
    });

    axios.get('/users/paymethods').then(res => {
      setPaymethods(res.data.paymentMethods);
    });

  }, []);

  const history = useHistory();

  const { coursePageId } = useParams();

  const handledClick = (values) => {
    const data = {
      coursePageId: coursePageId,
      paymentId: values.paymentId,
      passType: values.passType
    };
    axios.post("/orders", data).then(res => {
      alert("주문완료");
    });
  };

  const registerPaymentClick = () => {
    history.push("/users/paymethods/new");
  };

  const onFinish = (values: any) => {
    handledClick(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <div className="container payment-method-container">
        <p>{ course == null ? '' : course.title }</p>
        <p>{ department == null ? '' : department.name }</p>
        <p>{ school == null ? '' : school.name }</p>

        <div className="formWrapper">
          <Form
              name="basic"
              initialValues={{ }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
          >
            <Form.Item
                label="Pass Type"
                name="passType"
                rules={[{ required: true, message: 'Pass type을 선택해주세요.' }]}
            >
              <Radio.Group>
                <Radio.Button value="0">연습문제+Q&A Pass</Radio.Button>
                <Radio.Button value="1">노트 Pass</Radio.Button>
                <Radio.Button value="2">올인원 Pass</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
                label="카드번호"
                name="paymentId"
                rules={[{ required: true, message: '결제할 카드를 선택해주세요.' }]}
            >
              <Select placeholder="결제할 카드를 선택해 주세요.">
                { paymethods && paymethods.map(paymethod =>
                    <Option value={paymethod.id} key={paymethod.id}>**** **** **** {paymethod.last_4_digit}</Option>
                )}
              </Select>

            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="button" onClick={registerPaymentClick}>
                등록 / 변경
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

      </div>
  );
}

export default NewOrder;
