import React, {useState, useEffect, useLayoutEffect} from 'react';
import axios from "axios";
import "./index.scss";
import {Pagination, Row, Col} from 'antd';
import MyModal from "../../components/Modal"
import {useHistory} from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [page, setPage] = useState(1);
  const [modalSwitch, setModalSwitch] = useState({
    receipt: false,
  });
  const [isMobile, setIsMobile] = useState(null);
  const history = useHistory();

  useLayoutEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    axios.get(`/orders?page=${page}`).then(res => {
      setOrders(res.data.orders);
      setTotalCount(res.data.totalCount);
    });
  }, [page]);

  const getPassName = (order) => {
    if (order) {
      let passName;
      if (order.pass_type == 0) {
        passName = '연습문제+Q&A Pass';
      } else if (order.pass_type == 1) {
        passName = '노트 Pass';
      } else {
        passName = '올인원 Pass';
      }

      return `${order.course_page.course.title} ${passName}`;
    }
    return '';
  };

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  const getReceipt = (order) => {
    return [
      [
        <p className={'modal-title'}>구매 영수증</p>,
      ],
      [
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
              {getPassName(order)}
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
      ]
    ]
  };

  const goReceipt = function(order) {
    if (isMobile) {
      history.push(`/orders/${order.id}/receipt`);
    }
  };

  return (
      <div className={"orders-container"}>
        <ul className={"order-list"}>
          <li className={"row list-title"}>
            <div className={"created-at"}>
              구매일자
            </div>
            <div className={"amount"}>
              금액
            </div>
            <div className={"pass-type"}>
              구매이용권
            </div>
            <div className={"payment-method"}>
              결제수단
            </div>
            <div className={"receipt"}>
              영수증
            </div>
            <div className={"etc"}>
              비고
            </div>
          </li>

          {
            (orders &&
                orders.map((order) =>
                    <li onClick={() => goReceipt(order)} key={order.id} className={"row"}>
                      <div className={"created-at"}>
                        {order.createdAt.substring(0, 10)}
                      </div>
                      <div className={"amount"}>
                        {order.amount}
                      </div>
                      <div className={"pass-type"}>
                        {getPassName(order)}
                      </div>
                      <div className={"payment-method"}>
                        신용카드
                      </div>
                      {
                        isMobile ?
                            <></>
                            :

                            <div className={"receipt"}>
                              <div className={"btn"} onClick={() => {
                                setModalSwitch({
                                  ...modalSwitch,
                                  receipt: true
                                })
                              }}>보기
                              </div>
                              <MyModal
                                  customClass={'receipt-modal'}
                                  width={464}
                                  content={getReceipt(order)}
                                  target={["receipt"]}
                                  modalSwitch={modalSwitch}
                                  setModalSwitch={setModalSwitch}
                                  type={1}
                              />
                            </div>
                      }
                      <div className={"etc"}>
                        -
                      </div>
                    </li>
                )
            )
          }
        </ul>

        <Pagination size="small" current={page} total={totalCount} defaultPageSize={5} onChange={pageChanged} />
      </div>
  );
};

export default OrderList;
