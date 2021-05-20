import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {useCookies} from "react-cookie";

import { USER_INFORM_REQUEST, USER_CREATOR_INFORM_REQUEST } from '../../reducers/user';
import { USER_DEL_INFORM_REQUEST } from '../../reducers/user';

import axios from "axios";

import './style.scss'
import './mymenu.scss'
import {  Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Header = () => {
  const [cookie, setCookie] = useCookies(['Authorization']);
  const [visible, setVisible] = useState(false);
  const { user, inform } = useSelector((state) => ({
    inform: state.user.inform,
    user: state.user.user
  }));

  const dispatch = useDispatch();
  const history = useHistory();

  const handleVisibleChange = () => {
    
  };

  const logout = () => {
    setCookie('Authorization', -1, {path: '/', maxAge: 200000 });
  };

  useEffect(() => {
    if (cookie.Authorization && cookie.Authorization !== "-1") {
      dispatch({
        type: USER_INFORM_REQUEST,
      });
      dispatch({
        type: USER_CREATOR_INFORM_REQUEST,
      });
      // axios.get('/notifications').then(res => {
      //   setMyNotifications(res.data.myNotifications);
      //   setCreatorNotifications(res.data.creatorNotifications);
      // });
    } else {
      dispatch({
        type: USER_DEL_INFORM_REQUEST,
      });
      history.push('/');
    }
  }, [cookie])

  const myMenu = (
    <div className="m-user-inform-dropdown">
      <div className="m-user-inform">
        <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470409022.png"
        /> 
        <p>Ming</p>
      </div>
      <div className="m-dropdown-body">
        <div className="menu">
          <span>            
            MY 노트하우
          </span>
        </div>
        <div className="menu">
          <span>MY 강의</span>
        </div>
        <div className="menu">
          <span>MY Q&amp;A</span>
        </div>
        <div className="menu">
          <span
            onClick={logout}
          >
            로그아웃</span>
        </div>
        <div className="menu">
          <div className="line"></div>
        </div>
        <div className="menu">
          <span>튜터 지원</span>
        </div>
        <div className="menu">
          <span>강의 PASS</span>
        </div>
        <div className="menu">
          <span>알림</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="m-header-wrap">
      <div className="m-header-container">
        <div className="m-header-box">
          <img
            onClick={()=>history.push('/')}  
            src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620708831338.png" 
            alt="footer-logo"
          />  
          <div className="m-header-input">
            <p>강의명을 검색해보세요!</p>            
            <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620708961581.png" alt="search"/>
          </div>
          <div className="m-header-user">
            {/* <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470409022.png" /> */}
            {
              user ? (
                  <>
                    <Dropdown 
                      overlay={myMenu}
                      //onVisibleChange={handleVisibleChange}
                      // visible={visible}
                      // placement='topLeft'
                    >
                      <a className="m-ant-dropdown-link m-header-link" onClick={e => e.preventDefault()}>
                        <img 
                          src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470409022.png"
                        /> 
                        <DownOutlined />
                      </a>
                    </Dropdown>
                  </>
              ) : (
                  <Link className={'m-login-header-link'} to="/login">
                    <p>로그인</p>
                  </Link>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;