import React, {useState, useEffect, useLayoutEffect} from 'react';
import "./style.scss";
import axios from "axios";
import moment from "moment";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import MypageMenu from "../../mobileComponents/MypageMenu";
import Footer from "../../mobileComponents/Footer";
import { Button, Form, Input, Pagination, Upload, Select } from 'antd';

const { Option } = Select;

const profile = {
  "school":"고려대학교 00학과",
  "name":"Ming", 
  "profile": 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470409022.png'
}

const course = [{
  id:1,
  "state":"NEW",
  //"subject":"[PASS]",
  "text":"봄학기는 마무리는 잘하셨나요?",
  "date":"2021.01.22"
},
{
  id:2,
  //"state":"NEW",
  "subject":"[Q&A]",
  "text":"봄학기는 마무리는 잘하셨나요?",
  "date":"2021.01.22"
},
{
  id:3,
  //"state":"NEW",
  "subject":"[PASS]",
  "text":"봄학기는 마무리는 잘하셨나요?",
  "date":"2021.01.22"
},
]

const MyInquiry =() => {   
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [inquiries, setInquiries] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [page, setPage] = useState(1);

  const [layerPop, setLayerPop] = useState(false);

  const uploadUrl = "http://3.36.137.133/images/upload/inquiry";

  // useEffect(() => {
  //   window.scrollTo(0,0);
  //   getInquiries();
  // },[page]);
  
  // const getInquiries = () => {
  //   axios.get(`/users/inquiries?page=${page}`).then(res => {
  //     setUser(res.data.user);
  //     setInquiries(res.data.inquiries);
  //     setTotalCount(res.data.totalCount);
  //   }).catch(error => {
  //     debugger
  //     window.location.href = "/";
  //   });
  // };

  const getDateStr = (strDate) => {
    const date = new Date(strDate);
    return moment(date).format('YYYY.MM.DD');
  };

  const getStatusStr = (inquiry) => {
    if (inquiry.answer && inquiry.answer.length > 0) {
      return '답변완료';
    } else {
      return '답변 대기중';
    }
  };

  const popupClicked = () => {
    setLayerPop(true);
  };

  // const onFinish = (values: any) => {
  //   axios.post("/users/inquiry", values).then(res => {
  //     setLayerPop(false);
  //     getInquiries();
  //   });
  // };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const fileChanged = ({file, fileList}) => {
    if (file.status === 'done') {
      var files = form.getFieldValue("files") || '';
      form.setFieldsValue({files: files + file.response.key + ","});
    }
    console.log(fileList);
  };

  const [form] = Form.useForm();
  return (
    <div className="m-my-container">
      <div className="m-my-header">
        <p className="m-page-name">홈 > My노트하우</p>
        <p className="title">
          MY 노트하우
        </p>
        <div className="user-wrap">
          <div className="link-wrap">
            <div className="right">
              <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620709066503.png" alt="tool"/>
              <Link to="/users/edit">
                <div className="info">MY 정보</div>
              </Link>
            </div>
          </div>
          <div className="profile-wrap">
            <img 
              className="profile-img" 
              src={profile.profile}
            /> 
            <div className="profile-right">
              <p className="nickname">{profile.name}</p>
              <p className="school">{profile.school}</p>
            </div>
          </div>
        </div>  
      </div>

      <div className="m-my-line"></div>

      <MypageMenu />
      <div className="m-my-inquiry">
        <div className="inquiry-desc">1:1 상담은 24시간 등록이 가능하며, 등록된 내용은 평일 상담 시간 내 답변을 드릴 수 있도록 하겠습니다.</div>

        <div className="link-wrap" onClick={popupClicked}>
          1:1 문의 등록하기
        </div>              
      </div>

      <div className="m-my-line"/>
         
      <div className="m-my-inquiry-list">
        {course.map(item=>{
          return(
            <div className="noti-box" key={item.id}>
              <div className="tag-new">{item.state}</div>
              <div className="tag-subject">{item.subject}</div>
              <div className="text">{item.text}</div>
              <div className="date">{item.date}</div>
            </div>
          )
        })}    
      </div> 

      <Footer/>
      {/*
      {
        layerPop ?
        <>
          <div className="pop-wrapper">
            <div className="dimBg"></div>
            <div id="layer" className="pop-layer">
              <div className="pop-container">
                <div className="pop-conts">

                  <div className="pop-head clearfix">
                    <div className="title">1:1 문의신청</div>
                  </div>

                  <div className="pop-content">
                    <Form
                      form={form}
                      name="basic"
                      initialValues={{
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      <Form.Item
                        label="문의분야"
                        name="inquiryType"
                      >
                        {/* TODO: type 정의 */}
                        {/* <Select placeholder="분야선택">
                          <Option value="0">사용자</Option>
                          <Option value="1">튜터</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="제목"
                        name="title"
                        rules={[{required: true, message: '제목을 입력해 주세요.'}]}
                      >
                        <Input/>
                      </Form.Item>

                      <Form.Item
                        label="내용"
                        name="content"
                        rules={[{required: true, message: '내용을 입력해 주세요.'}]}
                      >
                        <Input.TextArea />
                      </Form.Item>

                      <Upload onChange={fileChanged} action={uploadUrl}>
                        <Button>파일선택</Button>
                      </Upload>

                      <Form.Item
                        label="첨부하기"
                        name="files"
                      >
                        <Input type={'hidden'}/>
                      </Form.Item>

                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        ''
      } */}
    </div>
  )  
}

export default MyInquiry;