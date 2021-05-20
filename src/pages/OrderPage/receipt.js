import React, {useState, useEffect, useLayoutEffect} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {Col, Row} from "antd";
import "./index.scss";

const Receipt = () => {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    axios.get(`/orders/${orderId}`).then(res => {
      setOrder(res.data.order);
    }).catch(error => {
    });
  }, []);

  const getOrderPassName = (o) => {
    if (o) {
      let passName;
      if (o.pass_type == 0) {
        passName = '연습문제+Q&A Pass';
      } else if (o.pass_type == 1) {
        passName = '노트 Pass';
      } else {
        passName = '올인원 Pass';
      }

      return `${o.course_page.course.title} ${passName}`;
    }
    return '';
  };

  return (
      order != null ?
          <div className={'order-receipt'}>
            <div className={'info-list'}>
              <Row>
                <Col className={'key'}>
                  주문번호
                </Col>
                <Col className={'val'}>
                  {order.merchant_uid}
                </Col>
              </Row>
              <Row>
                <Col className={'key'}>
                  거래일시
                </Col>
                <Col className={'val'}>
                  {order.createdAt}
                </Col>
              </Row>
              <Row>
                <Col className={'key'}>
                  상품명
                </Col>
                <Col className={'val'}>
                  {getOrderPassName(order)}
                </Col>
              </Row>
              <Row>
                <Col className={'key'}>
                  합계
                </Col>
                <Col className={'val'}>
                  {order.amount}
                </Col>
              </Row>
              <Row>
                <Col className={'key'}>
                  회사명
                </Col>
                <Col className={'val'}>
                  노트하우 주식회사
                </Col>
              </Row>
              <Row>
                <Col className={'key'}>
                  서명
                </Col>
                <Col className={'val'}>
                  {order.user.nickname}
                </Col>
              </Row>
            </div>
          </div>
          :
          <></>
  )
};

export default Receipt;
