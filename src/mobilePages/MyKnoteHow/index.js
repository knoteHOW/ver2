import React, {useState, useEffect, useLayoutEffect} from 'react';
import "./style.scss";
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";

import MypageMenu from "../../mobileComponents/MypageMenu";
import Footer from "../../mobileComponents/Footer";
import Mycourse from "./Mycourse.js";
import MyQna from "./MyQna.js";
import MyNoti from "./MyNoti.js";


const profile = {
  "school":"고려대학교 00학과",
  "name":"Ming", 
  "profile": 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470409022.png'
}

const MyKnoteHow =() => {
  const [isMobile, setIsMobile] = useState(null);
  
  const user = useSelector((state) => state.user.user);

  const history = useHistory();
  
  // useEffect(() => {
  //   window.scrollTo(0,0);
  // },[]);

  // const getModelName = (notification) => {
  //   let modelName;
  //   switch (notification.objectable_type) {
  //     case 'note_pages':
  //       modelName = '[노트]';
  //       break;
  //     case 'problems':
  //       modelName = '[연습문제]';
  //       break;
  //     case 'questions':
  //       modelName = '[Q&A]';
  //       break;
  //     case 'answers':
  //       modelName = '[Q&A]';
  //       break;
  //     default:
  //       modelName = '';
  //   }


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
      
      <Mycourse />
      {/* <MyQna /> My Qna*/}
      


      
      <Footer/>

    </div>
  )  
}

export default MyKnoteHow;