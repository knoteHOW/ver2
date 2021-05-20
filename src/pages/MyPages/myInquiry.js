import React, {useState, useEffect} from 'react';
import axios from "axios";
import moment from "moment";
import "./myPage.scss";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import { Button, Form, Input, Pagination, Upload, Select } from 'antd';
import LeftDefaultMenu from "../../components/users/LeftDefaultMenu";

const { Option } = Select;

const MyInquiry = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [inquiries, setInquiries] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [page, setPage] = useState(1);

  const [layerPop, setLayerPop] = useState(false);

  const uploadUrl = "http://3.36.137.133/images/upload/inquiry";

  useEffect(() => {
    window.scrollTo(0,0);
    getInquiries();
  },[page]);

  const getInquiries = () => {
    axios.get(`/users/inquiries?page=${page}`).then(res => {
      setUser(res.data.user);
      setInquiries(res.data.inquiries);
      setTotalCount(res.data.totalCount);
    }).catch(error => {
      debugger
      window.location.href = "/";
    });
  };

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

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

  const onFinish = (values: any) => {
    axios.post("/users/inquiry", values).then(res => {
      setLayerPop(false);
      getInquiries();
    });
  };

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
      <div className="container my-container">
        <div className="content">
          <p className="page-name">홈 > 1:1문의</p>

          <div className="grid">

            <LeftDefaultMenu currentMenu={'inquiry'}/>

            <div className="my-content">
              <p className="title">
                1:1 문의
              </p>

              <div className="inquiry-desc">1:1 상담은 24시간 등록이 가능하며, 등록된 내용은 평일 상담 시간 내 답변을 드릴 수 있도록 하겠습니다.</div>

              <div className="link-wrap" onClick={popupClicked}>
                1:1 문의 등록하기
              </div>

              <div className="list inquiries">
                <ul className="inquiry-list sub-list">
                  <li className="inquiry head">
                    <div className="reg-date">등록일</div>
                    <div className="i-title">제목</div>
                    <div className="status">상태</div>
                  </li>
                  {
                    (inquiries &&
                        inquiries.map((inquiry) =>
                            <li key={inquiry.id} className="inquiry">
                              <div className="reg-date">{getDateStr(inquiry.createdAt)}</div>
                              <div className="i-title">{inquiry.title}</div>
                              <div className="status">{getStatusStr(inquiry)}</div>
                            </li>
                        )
                    )
                  }
                </ul>
              </div>

              {
                totalCount > 0 ? (
                    <Pagination size="small" current={page} total={totalCount} defaultPageSize={12} onChange={pageChanged} />
                ) : ''
              }
            </div>
          </div>


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
                                <Select placeholder="분야선택">
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
          }
        </div>
      </div>
  );
}

export default MyInquiry;
