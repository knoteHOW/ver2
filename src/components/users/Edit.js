import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Form, Input, Button, Select, Switch } from 'antd';
import axios from "axios";
import "./edit.scss";
const { Option } = Select;

const Edit = () => {
  const [schoolsInfo, setSchoolsInfo] = useState(null);
  const [departmentsInfo, setDepartmentsInfo] = useState(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    axios.get('/schools').then(res => {
      setSchoolsInfo(res.data.schools);
    });

    if (user.user.user_department && user.user.user_department.departmentId) {
      axios.get(`/schools/${user.user.user_department.departmentId}/departments`).then(res => {
        setDepartmentsInfo(res.data.departments);
      });
    }
  }, []);

  const onSchoolChanged = (value) => {
    axios.get(`/schools/${value}/departments`).then(res => {
      setDepartmentsInfo(res.data.departments);
    });
  };

  const updateUser = (updateUser) => {
    const data = {
      updateUser: {
        name: updateUser.name,
        nickname: updateUser.nickname,
        birth: updateUser.birth,
        gender: updateUser.gender,
        phoneNumber: updateUser.phone_number,
        email: updateUser.email,
        school: updateUser.school,
        department: updateUser.department,
        classYear: updateUser.classYear
      }
    };

    axios.put("/users", data).then(res => {
      alert("수정성공");
    }).catch((e) => {
    });
  };

  const onFinish = (values: any) => {
    updateUser(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <div className="user-form">
        <Form
            name="basic"
            initialValues={{
              name: user.user.name,
              nickname: user.user.nickname,
              birth: user.user.birth,
              gender: user.user.gender,
              phone_number: user.user.phone_number,
              email: user.user.email,
              school: user.user.user_department.schoolId,
              department: user.user.user_department.departmentId,
              classYear: user.user.user_department.class_year,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
          <Form.Item
              label="이름"
              name="name"
              className="default"
              rules={[{required: true, message: '이름을 입력해 주세요.'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
              label="닉네임"
              name="nickname"
              rules={[{required: true, message: '닉네임을 입력해주세요.'}]}
          >
            <Input className="inp-confirm"/>

            {/*<Button type="primary" htmlType="button" className="confirm">*/}
            {/*  인증하기*/}
            {/*</Button>*/}
          </Form.Item>

          <Form.Item
              label="생년월일"
              name="birth"
              className="default"
          >
            <Input/>
          </Form.Item>

          <Form.Item
              label="성별"
              name="gender"
          >
            <Select
                placeholder=""
            >
              <Option value="0">남자</Option>
              <Option value="1">여자</Option>
            </Select>
          </Form.Item>

          <Form.Item
              label="휴대전화 번호"
              name="phone_number"
          >
            <Input className="inp-confirm"/>
          </Form.Item>

          <Form.Item
              label="이메일"
              name="email"
          >
            <Input className="inp-confirm"/>
          </Form.Item>

          <Form.Item
              label="학교"
              name="school"
          >
            <Select
                showSearch
                placeholder=""
                optionFilterProp="children"
                onChange={onSchoolChanged}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
              { schoolsInfo
              && schoolsInfo.map(school =>
                  <Option value={school.id} key={school.id}>{school.name}</Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
              label="학과"
              name="department"
          >
            <Select
                showSearch
                placeholder=""
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
              { departmentsInfo
              && departmentsInfo.map(department =>
                  <Option value={department.id} key={department.id}>{department.name}</Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
              label="학번"
              name="classYear"
          >
            <Select
                placeholder=""
            >
              <Option value="18">18</Option>
              <Option value="19">19</Option>
              <Option value="20">20</Option>
              <Option value="21">21</Option>
              <Option value="22">22</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              확인
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
};

export default Edit;