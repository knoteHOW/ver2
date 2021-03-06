import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import queryString from "query-string";
import {Form, Input, Select, Checkbox, Tabs, Radio, Button} from "antd";
import "./index.scss";
const { Option } = Select;

const NewOrder = ({location}) => {
  const history = useHistory();
  const [course, setCourse] = useState(null);
  const [coursePageId, setCoursePageId] = useState(null);
  const [department, setDepartment] = useState(null);
  const [school, setSchool] = useState(null);
  const [passType, setPassType] = useState(null);

  const [courses, setCourses] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [schools, setSchools] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    const query = queryString.parse(location.search);

    setCoursePageId(query.course);
    setPassType(2);

    if (query.course) {
      axios.get(`/courses/${query.course}/schools`).then(res => {
        setSchools(res.data.schools);
        setSchool(res.data.school);
        setDepartment(res.data.department);
        setCourse(res.data.course);

        form.setFieldsValue({school: res.data.school.id, department: res.data.department.id, course: res.data.course.id});

        axios.get(`/schools/${res.data.school.id}/departments`).then(res1 => {
          setDepartments(res1.data.departments);
        });

        axios.get(`/departments/${res.data.department.id}/courses`).then(res1 => {
          setCourses(res1.data.courses);
        });

      }).catch(e => {
      });
    } else {
      axios.get('/schools').then(res => {
        setSchools(res.data.schools);
      });
    }

    axios.get('/users/paymethods').then(res => {
      const paymentMethods = res.data.paymentMethods;
      setPaymentMethod(paymentMethods[0] || null);
    }).catch(e => {
    });
  }, []);

  const onSchoolChanged = (value) => {
    setSchool(schools.find((x) => x.id == value));
    axios.get(`/schools/${value}/departments`).then(res => {
      setDepartments(res.data.departments);
    });
  };

  const onDepartmentChanged = (value) => {
    setDepartment(departments.find((x) => x.id == value));
    axios.get(`/departments/${value}/courses`).then(res => {
      setCourses(res.data.courses);
    });
  };

  const onCourseChanged = (value) => {
    const c = courses.find((x) => x.id == value);
    setCourse(c);
    setCoursePageId(c.course_pages[0].id);
  };

  const onPassTypeChanged = (event) => {
    setPassType(event.target.value);
  };

  const onRegisterClicked = () => {
    setPaymentMethod(null);
  };

  const Summary = ({course, passType}) => {
    let passName;
    if (passType == 0) {
      passName = '????????????+Q&A Pass';
    } else if (passType == 1) {
      passName = '?????? Pass';
    } else {
      passName = '????????? Pass';
    }

    return (
        course && passName ? (
                <div className={"summary-wrapper"}>
                  <div className={"section"}>
                    <div className={"k"}>
                      ?????????
                    </div>
                    <div className={"v"}>
                      {course.title} {passName}
                    </div>
                  </div>

                  <div className={"section ml"}>
                    <div className={"k"}>
                      ???????????? :
                    </div>
                    <div className={"v"}>
                      {passType == 2 ? '10,900???' : '5,900???'}
                    </div>
                  </div>
                </div>
            )
            :
            <></>
    )
  };

  const PassName = ({school, department, course}) => {
    if (!course) {
      return (<></>);
    }

    return (
        school && department && course ? (
            <div className={"passname-wrapper"}>
              <span>{school.name}</span> > <span>{department.name}</span> > <span className={"orange"}>{course.title}</span> ??????PASS
            </div>
        ) : <></>
    );
  };

  const NewPaymentMethod = () => {
    return (
        <div className={"payment-method-wrapper"}>
          <div className={"card-img-wrapper"}></div>

          <div className={"card-info-wrapper"}>
            <div className={"number-wrapper"}>
              <Form.Item
                  label="????????????"
                  name="cardNumber"
                  rules={[{ required: true, message: '??????????????? ????????? ?????????.' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                  label="????????????(MMYY)"
                  name="expiry"
                  rules={[{ required: true, message: '??????????????? ????????? ?????????.' }]}
              >
                <Input />
              </Form.Item>


              <Form.Item
                  label="??????????????? ????????????(6??????)"
                  name="birth"
                  rules={[{ required: true, message: '??????????????? ??????????????????.' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                  label="???????????? ??? 2??????"
                  name="pwd2Digit"
                  rules={[{ required: true, message: '????????? ??????????????????.' }]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
        </div>
    )
  };

  const PaymentMethod = ({paymentMethod}) => {
    return (
        <div className={"payment-method-wrapper exist"}>
          <div className={"card-img-wrapper"}></div>

          <div className={"card-info-wrapper"}>
            <div className={"card-info"}>
              <div className={"label"}>
                ????????????
              </div>
              <div className={"v"}>
                ****-****-****-{paymentMethod.last_4_digit}
              </div>
            </div>
          </div>

          <div className={'reg-wrapper'}>
            <div className={"register-btn"} onClick={onRegisterClicked}>
              ??????/??????
            </div>
          </div>
        </div>
    )
  };

  const PayMethod = ({paymentMethod}) => {
    return (
        <>
          <div className={"sub-title"}>
            ???????????? ??????
          </div>

          {
            paymentMethod == null ?
                <NewPaymentMethod />
                :
                <PaymentMethod paymentMethod={paymentMethod}/>
          }
        </>
    );
  };

  const onFinish = (values: any) => {
    const data = {
      ...values,
      coursePageId: coursePageId,
      paymentMethod: paymentMethod ? paymentMethod.id : null,
    };

    debugger
    axios.post("/orders", data).then(res => {
      alert("????????????");
      history.push(`/courses/${coursePageId}`);
    });
  };

  return (
      <div className="order-container">
        <Form
            form={form}
            name="basic"
            initialValues={{
              school: school ? school.id : null,
              department: department ? department.id : null,
              course: course ? course.id : null,
              passType: 2,
            }}
            onFinish={onFinish}
        >

          <div className="select-wrapper">
            <Form.Item
                name="school"
                className="frm-select"
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
                { schools
                && schools.map(s =>
                    <Option value={s.id} key={s.id}>{s.name}</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
                name="department"
                className="frm-select"
            >
              <Select
                  showSearch
                  placeholder=""
                  optionFilterProp="children"
                  onChange={onDepartmentChanged}
                  filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
              >
                { departments
                && departments.map(d =>
                    <Option value={d.id} key={d.id}>{d.name}</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
                name="course"
                className="frm-select full"
            >
              <Select
                  showSearch
                  placeholder=""
                  onChange={onCourseChanged}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
              >
                { courses
                && courses.map(c =>
                    <Option value={c.id} key={c.id}>{c.title}</Option>
                )}
              </Select>
            </Form.Item>
          </div>

          <div className="course-info">
            <PassName school={school} department={department} course={course} />
          </div>

          <div className={"sub-section"}>
            <div className={"sub-title"}>
              ????????? ??????
            </div>

            <Form.Item
                name="passType"
                rules={[{ required: true, message: 'Pass type??? ??????????????????.' }]}
            >
              <Radio.Group onChange={onPassTypeChanged}>
                <Radio.Button value="0" className={'pass-radio'}>
                  <div className={"radio-wrapper"}>
                    <div className={`radio-img ${passType=='0' ? 'active' : ''}`}>
                    </div>
                    <div className={'passname'}>
                      <p className={'name'}>
                        ???????????? + Q&A PASS
                      </p>
                      <p className={'desc'}>
                        ???????????? PASS, Q&A PASS, ????????? 15??? ??????
                      </p>
                    </div>
                    <div className={'price'}>
                      ?????? 5,900???
                    </div>
                    <div className={'pass-img q-pass'}></div>
                  </div>
                </Radio.Button>
                <Radio.Button value="1" className={'pass-radio'}>
                  <div className={"radio-wrapper"}>
                    <div className={`radio-img ${passType=='1' ? 'active' : ''}`}>
                    </div>
                    <div className={'passname'}>
                      <p className={'name'}>
                        ?????? Pass
                      </p>
                      <p className={'desc'}>
                        ??????PASS Only
                      </p>
                    </div>
                    <div className={'price'}>
                      ?????? 5,900???
                    </div>
                    <div className={'pass-img q-pass'}></div>
                  </div>
                </Radio.Button>
                <Radio.Button value="2" className={'pass-radio'}>
                  <div className={"radio-wrapper"}>
                    <div className={`radio-img ${passType=='2' ? 'active' : ''}`}>
                    </div>
                    <div className={'passname'}>
                      <p className={'name'}>
                        ????????? Pass
                      </p>
                      <p className={'desc'}>
                        ??????PASS, ???????????? PASS, Q&A PASS, ????????? 15??? ??????
                      </p>
                    </div>
                    <div className={'price'}>
                      ?????? 10,900???
                    </div>
                    <div className={'pass-img q-pass'}></div>
                  </div>
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Summary course={course} passType={passType} />

          </div>

          <div className={"sub-section paymethod-wrapper"}>
            <PayMethod paymentMethod={paymentMethod} />
          </div>

          <div className={"confirm-wrapper"}>
            <p className={"desc"}>
              ??????????????? ?????? ?????????, ??? ?????? ????????? ???????????????.
            </p>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                ??????
              </Button>
            </Form.Item>
          </div>

        </Form>
      </div>
  );

};

export default NewOrder;
