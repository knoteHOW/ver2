import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import "./style.scss";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Select } from 'antd';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
const { Option } = Select;


const Signup = () => {
  const [socialInfo, setSocialInfo] = useState(null);
  const [schoolsInfo, setSchoolsInfo] = useState(null);
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [departmentsInfo, setDepartmentsInfo] = useState(null);
  const [departmentInfo, setDepartmentInfo] = useState(null);
  const [classYearInfo, setClassYearInfo] = useState(null);

  const [cookie, setCookie] = useCookies(['Authorization']);
  const hideBox = useRef();
  const isHide = useRef(false);
  const dropImg = useRef();

  const [allCheck, setAllCheck] = useState(false);
  const [subCheck, setSubCheck] = useState({
    serviceCheck: false,
    informCheck: false,
    marketCheck: false
  });
  const [input, setInput] = useState({
    name: '',
    phone: ''
  })
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0,0);
    const localSocialInfo = localStorage.getItem("socialInfo");
    if (localSocialInfo == null) {
      window.location.href = "/login";
    }
    const _socialInfo = JSON.parse(localSocialInfo);
    setSocialInfo(_socialInfo);
    console.log(_socialInfo, 'info')
    setInput({
      name: _socialInfo.profile && _socialInfo.profile.properties.nickname && _socialInfo.profile.properties.nickname,
      phone: _socialInfo.profile && _socialInfo.profile.kakao_account.phone_number && _socialInfo.profile.kakao_account.phone_number.replaceAll(/\D/g, '').replace('82', '0')
    })
    // localStorage.removeItem("socialInfo");
  }, []);

  useEffect(() => {
    axios.get('/schools').then(res => {
      setSchoolsInfo(res.data.schools);
    });
  }, []);

  const onSchoolChanged = (value) => {
    setSchoolInfo(value);
    axios.get(`/schools/${value}/departments`).then(res => {
      setDepartmentsInfo(res.data.departments);
    });
  };

  const onDepartmentChanged = (value) => {
    setDepartmentInfo(value);
  };

  const onClassYearChanged = (value) => {
    setClassYearInfo(value);
  }

  const setHide = () => {
    if(isHide.current) {
      hideBox.current.style.display = 'none'
      dropImg.current.style.transform = 'rotate(0)'
    } else {
      hideBox.current.style.display = 'block'
      dropImg.current.style.transform = 'rotate(180)'
    }
    isHide.current = !isHide.current
  }

  const onSignup = (userInfo) => {
    const data = {
      loginProvider: 'kakao',
      loginUserId: socialInfo.profile.id,
      token: socialInfo.response.access_token,
      nickname: userInfo.username,
      phoneNumber: userInfo.phone_number,
      school: userInfo.school,
      department: userInfo.department,
      classYear: userInfo.classYear
    };

    axios.post("/users", data).then(res => {
      setCookie('Authorization', res.data.token.access_token);
      window.location.href = "/";
    }).catch((e) => {
    });
  };

  const onFinish = (values) => {
    onSignup(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const changeInput = (e) => {
    const {name, value} = e.target;
    setInput({
      ...input,
      [name]: value
    })
  }

  const changeCheck = (e) => {
    const {name, value} = e.target;
    if(name === 'allCheck') {
      setAllCheck(!allCheck)
      if(!allCheck) {
        setSubCheck({
          serviceCheck: true,
          informCheck: true,
          marketCheck: true
        })
      } else {
        setSubCheck({
          serviceCheck: false,
          informCheck: false,
          marketCheck: false
        })
      }
    } else {
      setSubCheck({
        ...subCheck,
        [name]: !subCheck[name]
      })
    }
  }

  useEffect(() => {
    if(!subCheck.serviceCheck || !subCheck.informCheck || !subCheck.marketCheck) {
      setAllCheck(false);
    }
    if(subCheck.serviceCheck && subCheck.informCheck && subCheck.marketCheck) {
      setAllCheck(true);
    }
  }, [subCheck])

  return (
    <div className="m-signup-wrap">
      <div className="m-signup-container">
        <div className="m-logo" onClick={()=>history.push('/')} style={{ cursor: "pointer" }}>
          <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620110288952.png" alt="logo"/>
        </div>
        <div className="m-page-num">
        
          <div className="m-step">1</div>
          <div className="m-line"></div>
          <div className="m-step m-step-on">2</div>
        </div>
        <div className="m-title">
          <p>대학교 스터디는</p>
          <p><span className="m-orange">노트하우</span>에서!</p>
        </div>

        {
          socialInfo != null ?
              <div className="m-form">
                <Form
                    name="basic"
                    initialValues={{
                      username: socialInfo.profile && socialInfo.profile.properties.nickname && socialInfo.profile.properties.nickname,
                      phone_number: socialInfo.profile && socialInfo.profile.kakao_account.phone_number && socialInfo.profile.kakao_account.phone_number.replaceAll(/\D/g, '').replace('82', '0'),
                      school: '',
                      department: '',
                      classYear: ''
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                      label="이름"
                      name="username"
                      rules={[{required: true, message: '이름을 입력해 주세요.'}]}
                  >
                    <Input onChange={changeInput} name="name"/>
                  </Form.Item>
                  <Form.Item
                      label="닉네임"
                      name="nickname"
                      rules={[{required: true, message: '닉네임을 입력해 주세요.'}]}
                  >
                    <Input onChange={changeInput} name="nickname"/>
                  </Form.Item>

                  <Form.Item
                      label="전화번호"
                      name="phone_number"
                      rules={[{required: true, message: '전화번호를 입력해 주세요.'}]}
                  >
                    <Input onChange={changeInput} name="phone"/>
                  </Form.Item>


                  <Form.Item
                      label="학교"
                      name="school"
                      rules={[{required: true, message: '학교를 입력해주세요.'}]}
                  >
                    <Select
                        showSearch
                        showArrow={false}
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
                      rules={[{required: true, message: '학과를 입력해주세요.'}]}
                  >
                    <Select
                        showSearch
                        showArrow={false}
                        placeholder=""
                        optionFilterProp="children"
                        onChange={onDepartmentChanged}
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
                      rules={[{required: true, message: '학번을 선택해주세요.'}]}
                  >
                    <Select
                        placeholder=""
                        onChange={onClassYearChanged}
                        showArrow={false}
                    >
                      <Option value={16} key={16}>16</Option>
                      <Option value={17} key={17}>17</Option>
                      <Option value={18} key={18}>18</Option>
                      <Option value={19} key={19}>19</Option>
                      <Option value={20} key={20}>20</Option>
                      <Option value={21} key={21}>21</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <div className="m-check-box-wrap">
                      <div className="m-check-box-all">
                        <label htmlFor="all-check">
                          <span className="m-deco-text" onClick={()=>history.push('/terms/contract')}>서비스 이용약관</span><span>, </span>
                          <span className="m-deco-text" onClick={()=>history.push('/terms/inform')}>개인정보 수집 및 이용</span><span>, </span>
                          <span>마케팅 활용 동의</span>를 확인했고 동의합니다
                        </label>
                        <div style={{ display: "flex", alignItems: "center", height: "14px" }}>
                            <span onClick={setHide}><img className="m-drop-img" ref={dropImg} src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620125362937.png" alt=""/></span>
                          <input type="checkbox" name="allCheck" id="all-check" checked={allCheck ? true : false} onChange={changeCheck}/>
                        </div>
                      </div>
                      <div className="m-check-box-hide" ref={hideBox}>
                        <div className="m-check-box-area">
                          <label htmlFor="service-check">
                            <span className="m-deco-text" onClick={()=>history.push('/terms/contract')}>서비스 이용약관</span>에 동의합니다. (필수)
                          </label>
                          <input type="checkbox" name="serviceCheck" id="service-check" checked={subCheck.serviceCheck ? true : false} onChange={changeCheck}/>
                        </div>
                        <div className="m-check-box-area">
                          <label htmlFor="inform-check">
                            <span className="m-deco-text" onClick={()=>history.push('/terms/inform')}>개인정보 수집 및 이용</span>에 동의합니다. (필수)
                          </label>
                          <input type="checkbox" name="informCheck" id="inform-check" checked={subCheck.informCheck ? true : false} onChange={changeCheck}/>
                        </div>
                        <div className="m-check-box-area">
                          <label htmlFor="market-check">
                            <span>마케팅 활용</span>에 동의합니다. (선택)
                          </label>
                          <input type="checkbox" name="marketCheck" id="market-check" checked={subCheck.marketCheck ? true : false} onChange={changeCheck}/>
                        </div>
                      </div>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    {(input.name && input.phone && departmentInfo && schoolInfo && classYearInfo && subCheck.serviceCheck && subCheck.informCheck) ?
                    (
                      <Button type="primary" htmlType="submit">
                        동의하고 가입완료!
                      </Button>
                    ):
                    (
                      <div className="m-off-btn">동의하고 가입완료!</div>
                    )}
                      
                  </Form.Item>
                </Form>
              </div>
              : ''
        }


      </div>
    </div>
  );
}

export default Signup;
