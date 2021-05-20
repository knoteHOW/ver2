import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import "../Pass/index.scss";
import {Link} from "react-router-dom";
const LeftDefaultMenu = ({currentMenu}) => {
  const [isMobile, setIsMobile] = useState(null);
  const user = useSelector((state) => state.user.user);

  const profile1 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470409022.png';
  const profile2 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470422428.png';
  const profile3 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470440475.png';
  const profile4 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470456681.png';


  useLayoutEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', updateSize);
  }, []);

  const PcMenu = () => {
    return (
        <div className="shortcut">
          <p className="title">바로가기</p>

          <ul className="box menu-list">
            <li className="link">
              <Link to="/users/me">
                MY 노트하우
              </Link>
            </li>
            <li className="link">
              <Link to="/users/passes">
                MY 강의
              </Link>
            </li>
            <li className="link">
              <Link to="/users/my_questions">
                MY Q&A
              </Link>
            </li>
            <li className="link">
              <Link to="/users/notifications">
                MY 알림
              </Link>
            </li>
            <li className="link">
              <Link to="/users/inquiries">
                1:1 문의
              </Link>
            </li>
            <li className="link">
              <Link to="/passes?tab=order-list">
                구매 내역
              </Link>
            </li>
            <li className="link">
              <Link to="/passes?tab=payment-method">
                결제 수단 관리
              </Link>
            </li>
          </ul>
        </div>
    );
  };

  const MobileMenu = () => {
    return (
        <div className={'mobile-menu'}>
          <ul className="menu-list">
            <li className={currentMenu == 'pass' ? 'link active' : "link"}>
              <Link to="/users/passes">
                MY 강의
              </Link>
            </li>
            <li className={currentMenu == 'questions' ? 'link active' : "link"}>
              <Link to="/users/my_questions">
                MY Q&A
              </Link>
            </li>
            <li className={currentMenu == 'notifications' ? 'link active' : "link"}>
              <Link to="/users/notifications">
                MY 알림
              </Link>
            </li>
            <li className={currentMenu == 'inquiry' ? 'link active' : "link"}>
              <Link to="/users/inquiries">
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

  return (
      <div className="left-menu">
        {
          isMobile ?
              <div className={'mobile-title'}>MY 노트하우</div>
              :
              <></>
        }
        <div className="user-wrap box">
          <div className="link-wrap clearfix">
            <div className="right">
              <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620709066503.png" alt="tool"/>
              <Link to="/users/edit">
                <div className="info">MY 정보</div>
              </Link>
            </div>
          </div>

          <img 
            className="profile-img" 
            src={user && user.user && user.user.profile_image_id === 0 ? profile1 :
              user && user.user && user.user.profile_image_id === 1 ? profile2 :
              user && user.user && user.user.profile_image_id === 2 ? profile3 : profile4} 
          /> 
          <div className={'name-wrap'}>
            <p className="nickname">{user && user.user &&  user.user.nickname}</p>
            <p className="school">{user && user.user && user.user.user_department && user.user.user_department.school.name + ' ' + user.user.user_department.department.name}</p>
          </div>
        </div>

        {
          isMobile ?
              <MobileMenu />
              :
              <PcMenu />
        }
      </div>
  );
};

export default LeftDefaultMenu;
