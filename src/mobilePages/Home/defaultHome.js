import { useState, useEffect } from 'react';

import Header from '../../mobileComponents/Header';
import Footer from '../../mobileComponents/Footer';
import CourseCard from '../../mobileComponents/CourseCard';
import NoteCard from '../../mobileComponents/NoteCard';
import UnivSelect from '../../mobileComponents/UnivSelect';
import PassCard from '../../mobileComponents/PassCard';
import ReviewCard from '../../mobileComponents/ReviewCard';
import HomeFooter from '../../mobileComponents/HomeFooter';

import './style.scss';
import StepCard from '../../mobileComponents/StepCard';
import { RightOutlined } from '@ant-design/icons';

const course = [{
  id:1,
  "title":"컴퓨터프로그래밍I",
  "univ":"고려대학교",
  "subject":".공학계열.자연계열",
  "subcode":"CH101",
  "writer":"에이쁠"
},
{
  id:2,
  "title":"컴퓨터프로그래밍I",
  "univ":"고려대학교",
  "subject":".공학계열.자연계열",
  "subcode":"CH101",
  "writer":"에이쁠"
},
{
  id:3,
  "title":"컴퓨터프로그래밍I",
  "univ":"고려대학교",
  "subject":".공학계열.자연계열",
  "subcode":"CH101",
  "writer":"에이쁠"
}
]

const pass = {
  "title":"강의 PASS 정기권",
  "header":"강의 1개, 1개월 PASS",
  "check":"",
  "info":"원하는 강의를 선택하고 개념노트, 연습문제, Q&A를 마음껏 열람해보세요! 모르는건 튜터가 직접 답변해주는 질문으로 해결하세요:)",
  "caution":"학기가 종료되는 6월, 12월에는 정기 결제가 이루어지지 않습니다.",
  "percent":40,
  "originprice":19800,
  
}
const step = {
  "title":"Step 1. 개념노트",
  "header1":"헷갈리는 개념,",
  "header2":"확실하게 짚고 가세요!",
  "info":"이게 왜 이렇게 되지? 항상 의문만 가득했던 개념, 어쩔 수 없이 무작정 외우기만 했던 과거의 나는 안녕! 우리 학과 과탑이 만든 A+개념정리노트로 공부하세요.",
  "src":"https://knotehow-cover-image.s3-ap-northeast-2.amazonaws.com/original/72.png"
  
}
const review = [
  { id: 1, text: "ddddd", writer: "연세대학교 전기전자" },
  { id: 2, text: "fffff", writer: "연세대학교 전기전자" },
  { id: 3, text: "ggggg", writer: "연세대학교 전기전자"  },
  { id: 4, text: "hhhhh", writer: "연세대학교 전기전자"  },
]

const DefaultHome = () => {
  const [school, setSchool] = useState('');

  useEffect(() => {
    window.scrollTo(0,0);
  }, [school])

  return (
    <>
      {/* <Header /> */}
      <div className="m-main-container">
        <div className="m-main-image-1">
          <div className="m-main-heading">
            <p>{school ? `${school.replace('학교','')}학생은` : "대학생은"} 도대체</p>
            <p>어디서 공부해야할까?</p>
          </div>
          <div className="m-main-body">
            <p>노트하우는 새로운 대학생 스터디 문화를 만들었습니다.</p>
            <p>대학생 공부의 처음과 끝은 노트하우로!</p>
          </div>
          <div className="m-main-figure">
            <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621315262509.png" alt="home-img1"/>
          </div>
          <div className="m-main-search-button">
            <p>내가 듣는 강의 검색하러 가기</p>
          </div>
          <div className="m-main-image"></div>
        </div>
        {
          school ?
          (
            <div className="m-main-school-2">
              <div className="m-main-school-more">
                <p>더보기 &gt;</p>
              </div>  
              <div className="m-main-school-text">     
                <div className="m-main-school-text-top"> 
                  <div className="m-main-school-school">
                    <p>오직</p>
                    <p>{school && school}</p>
                  </div> 
                  <div className="m-main-school-grade">
                    <p>1</p>
                    <p>학년을</p>
                  </div>             
                </div> 
                <p>위한 강의 리스트!</p>
              </div>
              <div className = "m-main-school-course-scroll">
                <div className = "m-main-school-course">
                  {course.map(item=>{
                    return(
                      <div key={item.id}>
                        <CourseCard course={item}/>
                      </div>
                    )
                  })}            
                </div>
              </div>
            </div>
          ):
          (
            <div className="m-main-school">
              <div className="m-main-school-text">
                <p>내 학교를 선택하고</p>
                <p>맞춤형 강의를 찾아보세요!</p>
              </div>
              <UnivSelect
                setSchool={setSchool}
              />
            </div>
          )
        }
        <div className="m-main-pass-container">
          <div className="m-main-pass-header">
            <p>노트하우 PASS 종류</p>
          </div>          
          <PassCard pass={pass}></PassCard>
          <PassCard pass={pass}></PassCard>
          <div className="m-main-pass-search">
            <p>강의명을 검색해보세요!</p>            
            <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620708961581.png" alt="search"/>  
          </div>          
        </div>
        <div className="m-main-review">
          <ReviewCard review={review}></ReviewCard>
        </div>
        <div className="m-main-step">
          <div className="m-main-step-text">
            <p>성적이 오를 수 밖에 없는</p>
            <p>노트하우만의 솔루션!</p>
          </div>
          <StepCard step={step}></StepCard>
          <StepCard step={step}></StepCard>
          <StepCard step={step}></StepCard>
        </div>
      </div>
      <HomeFooter 
        school={school}
        setSchool={setSchool}
      />
      {/* <CourseCard course={course}/>
      <NoteCard course={course}/> */}
      <Footer />
    </>
  )
}

export default DefaultHome;