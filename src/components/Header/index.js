import React, {useState, useEffect, createRef, useLayoutEffect} from 'react';
import './index.scss'
import './style.css';
import {Link, useHistory} from 'react-router-dom';
import LogoutButton from "../../components/Header/logout";
import axios from "axios";
import {useCookies} from "react-cookie";
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { USER_INFORM_REQUEST, USER_CREATOR_INFORM_REQUEST } from '../../reducers/user';
import { USER_DEL_INFORM_REQUEST } from '../../reducers/user';
import * as actions from "../../actions";
import Notification from "../../components/Header/Notification";

import { Tabs } from 'antd';

const { TabPane } = Tabs;

const Header = () => {
  const [cookie, setCookie] = useCookies(['Authorization']);
  const [myNotifications, setMyNotifications] = useState(null);
  const [creatorNotifications, setCreatorNotifications] = useState(null);
  const [queryInput, setQueryInput] = useState(() => createRef());
  const [isMobile, setIsMobile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState(false);
  const [mobileSubMenuPathName, setMobileSubMenuPathName] = useState(null);
  const { user, inform } = useSelector((state) => ({
    inform: state.user.inform,
    user: state.user.user
  }));

  const profile1 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470409022.png';
  const profile2 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470422428.png';
  const profile3 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470440475.png';
  const profile4 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470456681.png';

  const dispatch = useDispatch();

  const history = useHistory();

  const logout = () => {
    setCookie('Authorization', -1, {path: '/', maxAge: 200000 });
  };

  useLayoutEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (cookie.Authorization && cookie.Authorization !== "-1") {
      dispatch({
        type: USER_INFORM_REQUEST,
      });
      dispatch({
        type: USER_CREATOR_INFORM_REQUEST,
      });
      axios.get('/notifications').then(res => {
        setMyNotifications(res.data.myNotifications);
        setCreatorNotifications(res.data.creatorNotifications);
      });
    } else {
      dispatch({
        type: USER_DEL_INFORM_REQUEST,
      });
      history.push('/');
    }
  }, [cookie])

  const subMenus = [
    '/questions',
    '/receipt'
  ];

  useEffect(() => {
    var subMenuType = subMenus.find(subMenu => history.location.pathname.includes(subMenu) );
    if (subMenuType && subMenuType.length > 0) {
      setMobileSubMenuPathName(subMenuType);
      setMobileSubMenu(true);
    } else {
      setMobileSubMenuPathName(null);
      setMobileSubMenu(false);
    }

    history.listen((location, action) => {
      var subMenuType = subMenus.find(subMenu => location.pathname.includes(subMenu) );
      if (subMenuType && subMenuType.length > 0) {
        setMobileSubMenuPathName(subMenuType);
        setMobileSubMenu(true);
      } else {
        setMobileSubMenuPathName(null);
        setMobileSubMenu(false);
      }
    });
  }, []);

  const getMobileSubMenuTitle = () => {
    switch (mobileSubMenuPathName) {
      case '/questions':
        return '문의하기';
      case '/receipt':
        return '구매 영수증';
      default:
        return '';
    }
  };
  const handleMenuClick = e => {
    setVisible(false);
  };

  const handleVisibleChange = flag => {
    setVisible(flag);
  };

  const myMenu = (
    <div className="user-inform-dropdown">
      <div className="user-inform">
        <img className="user-profile" 
          src={user && user.user && user.user.profile_image_id === 0 ? profile1 :
              user && user.user && user.user.profile_image_id === 1 ? profile2 :
              user && user.user && user.user.profile_image_id === 2 ? profile3 : profile4} 
        /> 
        <p>{user && user.user && user.user.nickname}</p>
      </div>
      <div className="dropdown-body">
        <div className="menu">
          <span 
            onClick={() => {
              history.push('/users/me')
              handleMenuClick();
            }}
          >MY 노트하우</span>
        </div>
        <div className="menu">
          <span 
            onClick={() => {
              history.push('/users/passes')
              handleMenuClick();
            }}
          >MY 강의</span>
        </div>
        <div className="menu">
          <span 
            onClick={() => {
              history.push('/users/my_questions')
              handleMenuClick();
            }}
          >MY Q&amp;A</span>
        </div>
        <div className="menu">
          <span 
            onClick={() => {
              logout();
              handleMenuClick();
            }}
          >로그아웃</span>
        </div>
      </div>
    </div>
  );

  const headNotification = (
      <Tabs defaultActiveKey="1" className="tab-list">
        <TabPane tab="MY" key="1">
          <ul className="notification-list">
            {
              (myNotifications &&
                  myNotifications.map((notification) =>
                      <li key={notification.id} className="notification">
                        <Notification notification={notification} />
                      </li>
                  )
              )
            }
          </ul>
          {myNotifications && myNotifications.length > 0 ?
            <div className="more-btn" onClick={()=>history.push('/users/notifications')}>더보기</div>
            :
            <div className="none-notification">
              알림이 없습니다.
            </div>
          }
        </TabPane>
        <TabPane tab="튜터" key="2">
          {
            user && user.user && user.user.creator ?
            <>
              <ul className="notification-list">
                {
                  (creatorNotifications &&
                      creatorNotifications.map((notification) =>
                          <li key={notification.id} className="notification">
                            <Notification notification={notification} />
                          </li>
                      )
                  )
                }
              </ul>
              {creatorNotifications &&
                <div className="more-btn" onClick={()=>history.push('/users/notifications')}>더보기</div>
              }
            </> :
            <>
              <div className="none-creator">
                <p>아직, 튜터가 아니시군요!</p>
                <a href="https://tutor.knotehow.com" rel="noopener noreferrer" target="_blank">
                  <div className="none-btn">
                    노트하우 튜터 지원하러가기
                  </div>
                </a>
              </div>
            </>
          }
        </TabPane>
      </Tabs>
  );

  const onSearchClicked = () => {
    if (queryInput.current.value.length == 0) {
      return;
    }

    const q = queryInput.current.value;
    queryInput.current.value = '';
    history.push(`/search?q=${q}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearchClicked();
    }
  };

  const getPlaceholder = () => {
    if (isMobile) {
      return '검색';
    }
    return "원하는 강의를 검색해보세요!";
  };

  return (
      mobileSubMenu ?
          <>
            <div className={'header-wrap sub-menu'}>
              <div className={'back-btn'} onClick={() => {
                if (history.length == 0) {
                  history.push("/");
                } else {
                  history.goBack()
                }
              }}></div>
              <div className={'header-title'}>
                {getMobileSubMenuTitle()}
              </div>
            </div>
          </>
          :
          <>
            <div className="header-wrap">
              <div className="header-container">
                <div className="header-box">
                  <Link to={"/"}>
                    <div className="header-logo">
                      <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620708831338.png" alt="footer-logo"/>
                    </div>
                  </Link>
                  <div className="header-input">
                    <input type="text" ref={queryInput} placeholder={getPlaceholder()} onKeyPress={handleKeyPress}/>
                    <div className="header-search-icon">
                      <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620708961581.png" alt="search"/>
                    </div>
                  </div>
                  <div className="header-user">
                    {
                      !user || user && !user.creator ?
                          <a className='pc header-link' href="https://tutor.knotehow.com" rel="noopener noreferrer" target="_blank">
                            튜터 지원하기
                          </a>
                          :
                          <a className='pc header-link' href="https://tutor.knotehow.com/users/me" rel="noopener noreferrer" target="_blank">
                            튜터 홈
                          </a>
                    }

                    {
                      user ?
                          <Link className={'header-link pc'} to={'/passes'}>
                            강의 PASS
                          </Link>
                          :
                          <></>
                    }

                    {
                      user ? (
                          <>
                            <Dropdown 
                              overlay={headNotification}
                              trigger={['click']}
                            >
                              <a className="ant-dropdown-link header-link" onClick={e => e.preventDefault()}>
                                <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/ico_noti.png" />
                              </a>
                            </Dropdown>

                            <Dropdown 
                              overlay={myMenu}
                              onVisibleChange={handleVisibleChange}
                              visible={visible}
                            >
                              <a className="ant-dropdown-link header-link" onClick={e => e.preventDefault()}>
                                <img 
                                  className="user-profile" 
                                  src={user && user.user && user.user.profile_image_id === 0 ? profile1 :
                                    user && user.user && user.user.profile_image_id === 1 ? profile2 :
                                    user && user.user && user.user.profile_image_id === 2 ? profile3 : profile4} 
                                /> 
                                <DownOutlined />
                              </a>
                            </Dropdown>
                          </>
                      ) : (
                          <Link className={'login-header-link'} to="/login">
                            <p>로그인</p>
                          </Link>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
  )
}

export default Header;