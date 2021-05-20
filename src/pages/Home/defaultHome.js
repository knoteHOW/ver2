import React, {useEffect, useState} from "react";
import "./defaultHome.scss";

const DefaultHome = () => {
  return (
      <>

        <div className="home-wrap-2">
          <div className="home-container-2">
            <div className="home-img-box img-0"></div>
            <div className="home-text-box">
              <div className="home-text-caption">
                <p>강의 검색</p>
              </div>
              <div className="home-text-header">
                <p>왜 대학교는 강의별로<br/>
                  참고서가 없는 걸까?</p>
              </div>
              <div className="home-text-body">
                <p>초등학교, 중학교, 고등학교는 과목별로 문제집, 참고서가<br/>
                  다양한데 왜 대학교는 강의별로 없을까요?<br/>
                  내가 듣는 그 강의! 참고서가 노트하우에 있습니다.</p>
              </div>
              <div className="home-text-btn search">
                원하는 강의를 검색해보세요.
                <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620708961581.png" alt="search"/>
              </div>
            </div>
          </div>
        </div>

        <div className="home-wrap-2">
          <div className="home-container-2">
            <div className="home-text-box">
              <div className="home-text-caption">
                <p>개념노트</p>
              </div>
              <div className="home-text-header">
                <p>헷갈리는 개념,<br/>
                  확실하게 짚고 가세요!</p>
              </div>
              <div className="home-text-body">
                <p>
                  이게 왜 이렇게 되지? 항상 의문만 가득했던 개념,<br/>
                  어쩔 수 없이 무작정 외우기만 했던 과거의 나는 안녕!<br/>
                  우리 학과 과탑이 만든 A+ 개념정리노트로 공부하세요.
                </p>
              </div>
              <div className="home-text-btn">
                원하는 개념노트 검색하기
              </div>
            </div>

            <div className="home-img-box img-1"></div>
          </div>
        </div>

        <div className="home-wrap-2 pink">
          <div className="home-container-2">
            <div className="home-img-box img-2"></div>
            <div className="home-text-box2">
              <p>
                “노트하우를 만난 건 올해 제가 제일 잘 한 일이라고 생각합니다. 처음에는 다른 친구의 개념노트를 보며 공부하다가 실력이 향상되어 저도 개념노트를 만들기 시작했습니다.”
              </p>

              <p className="name">서울대학교 경영학과 18학번 김OO</p>
            </div>
          </div>
        </div>

        <div className="home-wrap-2">
          <div className="home-container-2">
            <div className="home-img-box img-3"></div>
            <div className="home-text-box">
              <div className="home-text-caption">
                <p>연습문제</p>
              </div>
              <div className="home-text-header">
                <p>개념을 어떻게<br/>
                  응용해야할까?</p>
              </div>
              <div className="home-text-body">
                <p>
                  내가 공부한 것들이 이게 맞나…?<br/>
                  제대로 이해했는지 확인해보고 싶다면?<br/>
                  노트하우 튜터가 만든 연습문제를 풀어보세요!
                </p>
              </div>
              <div className="home-text-btn search">
                연습문제 검색하러 가기
                <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620708961581.png" alt="search"/>
              </div>
            </div>
          </div>
        </div>

        <div className="home-wrap-2">
          <div className="home-container-2">
            <div className="home-text-box">
              <div className="home-text-caption">
                <p>Q&A</p>
              </div>
              <div className="home-text-header">
                <p>
                  이거 누구한테<br/>
                  물어봐야하지…?
                </p>
              </div>
              <div className="home-text-body">
                <p>
                  공부하다가 막혀 아무리 찾아봐도 나오지 않아<br/>
                  포기한 부분들이 있지 않나요?<br/>
                  이제는 노트하우에 질문하고 답변을 받아보세요!
                </p>
              </div>
              <div className="home-text-btn">
                질문하러 가기
              </div>
            </div>

            <div className="home-img-box img-4"></div>
          </div>
        </div>

        <div className="home-wrap-2 pink">
          <div className="home-container-2">
            <div className="home-img-box img-5"></div>
            <div className="home-text-box2">
              <p>
                “전공 선택을 잘못했나 싶었어요… 성적이 잘 안나오니까 재미, 흥미가 없었는데 친구 추천으로 노트하우로 공부하고나서는 성적도 오르고 재미, 흥미 또한 올랐네요 :)”
              </p>

              <p className="name">
                연세대학교 물리학과 19학번 정OO
              </p>
            </div>
          </div>
        </div>

        <div className="home-wrap-2">
          <div className="home-container-2">
            <div className="home-img-box img-6"></div>
            <div className="home-text-box">
              <div className="home-text-caption">
                <p>노트하우 이용권</p>
              </div>
              <div className="home-text-header">
                <p>노트하우<br/>
                  이용하는 방법은?</p>
              </div>
              <div className="home-text-body">
                <p>
                  나에게 필요한 패스권을 구매하여<br/>
                  노트하우로 성적 올리기를 도전해보세요!
                </p>
              </div>
              <div className="home-text-btn">
                이용권 구매하기
              </div>
            </div>
          </div>
        </div>
      </>
  )
};

export default DefaultHome;
