import React, { useState, useEffect, useRef, createRef } from 'react';
import {useSelector} from "react-redux";
import * as actions from "../../actions";
import "./index.scss";
import queryString from "query-string";
import {Form, Input, Select, Checkbox, Tabs} from "antd";

import NewOrder from "../../components/Order";
import OrderList from "../../components/OrderList";
import Subscribe from "../../components/Subscribe";
import PayMethod from "../../components/PayMethod";

import {useHistory} from "react-router-dom";

const { Option } = Select;
const { TabPane } = Tabs;


const PassPage = ({location}) => {
  const query = queryString.parse(location.search);

  const [tabName, setTabName] = useState(null);

  useEffect(() => {
    window.scrollTo(0,0);
    if (query.tab) {
      setTabName(query.tab);
    } else {
      setTabName("order");
    }
  }, []);

  const OrderForm = () => {
    return (
        <>
          <NewOrder location={location} />
        </>
    );
  };

  const MyOrderList = () => {
    return (
        <>
          <OrderList />
        </>
    );
  };

  const MyPassList = () => {
    return (
        <>
          <Subscribe />
        </>
    );
  };

  const PaymentManagement = () => {
    return (
        <>
          <PayMethod />
        </>
    );
  };

  return (
      tabName ? (
              <div className="container course-container">
                <div className="content">
                  <p className="page-name">
                    홈 > 강의 PASS
                  </p>

                  <div className="page-title">
                    강의 PASS
                  </div>

                  <Tabs defaultActiveKey={tabName}>
                    <TabPane tab="강의 PASS 구매" key="order">
                      <OrderForm />
                    </TabPane>
                    <TabPane tab="구매내역" key="order-list">
                      <MyOrderList />
                    </TabPane>
                    <TabPane tab="PASS 현황" key="passes">
                      <MyPassList />
                    </TabPane>
                    <TabPane tab="결제 수단 관리" key="payment-method">
                      <PaymentManagement />
                    </TabPane>
                  </Tabs>
                </div>
              </div>
          )
          :
          <></>
  );
};

export default PassPage;
