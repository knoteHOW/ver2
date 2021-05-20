import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
//import "../Pass/index.scss";
import {Link} from "react-router-dom";  
import "./style.scss";
  
const MypageMenu = ({currentMenu}) => {  
  return (
    <div className={'mobile-menu'}>
      <ul className="menu-list">
        <li className={currentMenu == 'pass' ? 'link active' : "link"}>
          <Link to="/mypage/mycourse">
            MY 강의
          </Link>
        </li>
        <li className={currentMenu == 'questions' ? 'link active' : "link"}>
          <Link to="/mypage/myqna">
            MY Q&A
          </Link>
        </li>
        <li className={currentMenu == 'notifications' ? 'link active' : "link"}>
          <Link to="/mypage/mynoti">
            MY 알림
          </Link>
        </li>
        <li className={currentMenu == 'inquiry' ? 'link active' : "link"}>
          <Link to="/mypage/myinquiry">
            1:1 문의
          </Link>
        </li>
        <li className={currentMenu == 'orders' ? 'link active' : "link"}>
          <Link to="/passes?tab=order-list">
            구매 내역
          </Link>
        </li>
        <li className={currentMenu == 'paymethod' ? 'link active' : "link"}>
          <Link to="/passes?tab=payment-method">
            결제 수단 관리
          </Link>
        </li>
      </ul>
    </div>
  );
};
  
export default MypageMenu;
