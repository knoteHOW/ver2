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
      passName = '연습문제+Q&A Pass';
    } else if (passType == 1) {
      passName = '노트 Pass';
    } else {
      passName = '올인원 Pass';
    }

    return (
        course && passName ? (
                <div className={"summary-wrapper"}>
                  <div className={"section"}>
                    <div className={"k"}>
                      상품명
                    </div>
                    <div className={"v"}>
                      {course.title} {passName}
                    </div>
                  </div>

                  <div className={"section ml"}>
                    <div className={"k"}>
                      결제금액 :
                    </div>
                    <div className={"v"}>
                      {passType == 2 ? '10,900원' : '5,900원'}
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
              <span>{school.name}</span> > <span>{department.name}</span> > <span className={"orange"}>{course.title}</span> 강의PASS
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
                카드번호
              </div>
              <div className={"v"}>
                ****-****-****-{paymentMethod.last_4_digit}
              </div>
            </div>
          </div>

          <div className={'reg-wrapper'}>
            <div className={"register-btn"} onClick={onRegisterClicked}>
              등록/변경
            </div>
          </div>
        </div>
    )
  };

  const PayMethod = ({paymentMethod}) => {
    return (
        <>
          <div className={"sub-title"}>
            결제수단 선택
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
      alert("주문완료");
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
              이용권 선택
            </div>

            <Form.Item
                name="passType"
                rules={[{ required: true, message: 'Pass type을 선택해주세요.' }]}
            >
              <Radio.Group onChange={onPassTypeChanged}>
                <Radio.Button value="0" className={'pass-radio'}>
                  <div className={"radio-wrapper"}>
                    <div className={`radio-img ${passType=='0' ? 'active' : ''}`}>
                    </div>
                    <div className={'passname'}>
                      <p className={'name'}>
                        연습문제 + Q&A PASS
                      </p>
                      <p className={'desc'}>
                        연습문제 PASS, Q&A PASS, 질문권 15장 포함
                      </p>
                    </div>
                    <div className={'price'}>
                      매월 5,900원
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
                        노트 Pass
                      </p>
                      <p className={'desc'}>
                        노트PASS Only
                      </p>
                    </div>
                    <div className={'price'}>
                      매월 5,900원
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
                        올인원 Pass
                      </p>
                      <p className={'desc'}>
                        노트PASS, 연습문제 PASS, Q&A PASS, 질문권 15장 포함
                      </p>
                    </div>
                    <div className={'price'}>
                      매월 10,900원
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
              주문내역을 확인 했으며, 위 결제 내역에 동의합니다.
            </p>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                다음
              </Button>
            </Form.Item>
          </div>

        </Form>
      </div>
  );

};

export default NewOrder;
