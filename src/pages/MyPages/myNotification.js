import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./myPage.scss";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import Notification from "../../components/users/Notification";

import { Pagination } from 'antd';
import LeftDefaultMenu from "../../components/users/LeftDefaultMenu";

const MyNotification = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);

  const [notifications, setNotifications] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0,0);
    axios.get(`/users/notifications?page=${page}`).then(res => {
      setUser(res.data.user);
      setNotifications(res.data.notifications);
      setTotalCount(res.data.totalCount);
    }).catch(error => {
      window.location.href = "/";
    });
  },[page]);

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  return (
      <div className="container my-container">
        <div className="content">
          <p className="page-name">홈 > 튜터 홈</p>

          <div className="grid">

            <LeftDefaultMenu currentMenu={'notifications'}/>

            <div className="my-content">
              <p className="title">
                튜터 알림
              </p>

              <div className="list notifications">
                <ul className="notification-list sub-list">
                  {
                    (notifications &&
                        notifications.map((notification) =>
                            <li key={notification.id}>
                              <Notification notification={notification} />
                            </li>
                        )
                    )
                  }
                </ul>
              </div>

              <Pagination size="small" current={page} total={totalCount} defaultPageSize={7} onChange={pageChanged} />
            </div>
          </div>
        </div>
      </div>
  );
}

export default MyNotification;
