import "./style.scss";
import SortDropDown from "../../mobileComponents/SortDropDown";

import React, {useState, useEffect, useLayoutEffect} from 'react';
import "./style.scss";
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";

import MypageMenu from "../../mobileComponents/MypageMenu";
import Footer from "../../mobileComponents/Footer";

const profile = {
  "school":"고려대학교 00학과",
  "name":"Ming", 
  "profile": 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470409022.png'
}

const course = [{
  id:1,
  "state":"NEW",
  //"subject":"[PASS]",
  "text":"봄학기는 마무리는 잘하셨나요?",
  "date":"2021.01.22"
},
{
  id:2,
  //"state":"NEW",
  "subject":"[Q&A]",
  "text":"봄학기는 마무리는 잘하셨나요?",
  "date":"2021.01.22"
},
{
  id:3,
  //"state":"NEW",
  "subject":"[PASS]",
  "text":"봄학기는 마무리는 잘하셨나요?",
  "date":"2021.01.22"
},
]

const MyNoti = ()=>{
  return(
    <>
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
      
      <div className="m-my-sortdown">
        <SortDropDown />
      </div> 
      <div className="m-my-noti">
        {course.map(item=>{
          return(
            <div className="noti-box" key={item.id}>
              <div className="tag-new">{item.state}</div>
              <div className="tag-subject">{item.subject}</div>
              <div className="text">{item.text}</div>
              <div className="date">{item.date}</div>
            </div>
          )
        })}    
      </div> 
              
      <Footer/>

    </div>      
    </>
  )
}
export default MyNoti;