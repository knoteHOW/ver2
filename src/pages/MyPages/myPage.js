import React, {useState, useEffect, useLayoutEffect} from 'react';
import axios from "axios";
import "./myPage.scss";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import LeftDefaultMenu from "../../components/users/LeftDefaultMenu";
import Pass from "../../components/Pass";
import Question from "../../components/Question";

const MyPage = () => {
  const [isMobile, setIsMobile] = useState(null);
  
  const user = useSelector((state) => state.user.user);

  const history = useHistory();


  useLayoutEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    window.scrollTo(0,0);
  },[]);

  const getModelName = (notification) => {
    let modelName;
    switch (notification.objectable_type) {
      case 'note_pages':
        modelName = '[노트]';
        break;
      case 'problems':
        modelName = '[연습문제]';
        break;
      case 'questions':
        modelName = '[Q&A]';
        break;
      case 'answers':
        modelName = '[Q&A]';
        break;
      default:
        modelName = '';
    }
  
    return modelName;
  };
  useEffect(() => {
    if (isMobile) {
      history.push("/users/passes");
    }
  }, [isMobile]);

  return (
      <div className="container my-container">
        <div className="content">
          <p className="page-name">홈 > My노트하우</p>

          <div className="grid">

            <LeftDefaultMenu />

            <div className="my-content">
              <p className="title">
                MY 노트하우
              </p>

              <div className="list passes">
                <div className="title-wrap">
                  <div className="list-title">
                    MY 강의
                  </div>

                  {
                    (user && user.passCount && user.passCount > 4) ?
                        <Link to="/me/passes" className="more">
                          더보기
                        </Link>
                        :
                        ''
                  }
                </div>

                <ul className="pass-list sub-list">
                  {
                    (user && user.passes &&
                        user.passes.map((pass) =>
                            <li key={pass.id}>
                              <Pass pass={pass} />
                            </li>
                        )
                    )
                  }
                </ul>
              </div>

              <div className="list questions">
                <div className="title-wrap">
                  <div className="list-title">
                    MY Q&A
                  </div>

                  {
                    user && user.questionCount &&
                    user.questionCount > 4 ?
                        <Link to="/me/questions" className="more">
                          더보기
                        </Link>
                        :
                        ''
                  }
                </div>

                <ul className="question-list sub-list">
                  {
                    (user && user.questions &&
                            user.questions.map((question) =>
                                <li key={question.id}>
                                  <Question question={question} />
                                </li>
                            )
                    )
                  }
                </ul>
              </div>

              <div className="list questions">
                <div className="title-wrap">
                  <div className="list-title">
                    MY 알림
                  </div>

                  {
                    user &&
                    user.questionCount > 4 ?
                        <Link to="/me/questions" className="more">
                          더보기
                        </Link>
                        :
                        ''
                  }
                </div>
                <ul className="question-list sub-list">
                  {
                    (user && user.notifications &&
                            user.notifications.map((notification) =>
                                <li key={notification.id}>
                                  <div className="notification-wrap">
                                    <div className="notification-title-wrap">
                                      {
                                        notification.isNew ?
                                            <div className="new-obj">NEW</div> :
                                            ''
                                      }

                                      <div className="model-name">
                                        {
                                          getModelName(notification)
                                        }
                                      </div>

                                      <div className="message">
                                        {notification.message}
                                      </div>
                                    </div>
                                    <p className="created-at">
                                      {notification.createdAt}
                                    </p>
                                  </div>
                                  {/* <div>{notification}</div> */}
                                  {/* <Question question={question} /> */}
                                </li>
                            )
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default MyPage;
