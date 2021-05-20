import React, {useState, useEffect, useLayoutEffect, createRef} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import axios from 'axios';
import "./index.scss";

import { Card, Comment } from 'antd';
import Question from "../../components/Question";

const QuestionList = () => {
  const {courseId} = useParams();

  const [questions, setQuestions] = useState(null);
  const [pass, setPass] = useState(null);

  const [myBookmark, setMyBookmark] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const [course, setCourse] = useState(null);
  const [school, setSchool] = useState(null);
  const [department, setDepartment] = useState(null);
  const [professor, setProfessor] = useState(null);

  const [coursePageId, setCoursePageId] = useState(null);
  const [isMobile, setIsMobile] = useState(null);

  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    axios.get(`/courses/${courseId}/questions`).then(res => {
      setUser(res.data.user);
      setPass(res.data.pass);

      setQuestions(res.data.questions);

      const coursePage = res.data.coursePage;
      setDepartment(coursePage.course.department);
      setSchool(coursePage.course.department.school);
      setProfessor(coursePage.course.professor);

      setMyBookmark(res.data.bookmark);
      setBookmarkCount(res.data.bookmarkCount);
      setCourse(coursePage.course);
    });
  }, []);

  const getPassName = () => {
    if (pass) {
      return `icon${pass.pass_type}`;
    } else {
      if (myBookmark) {
        return `icon4`;
      } else {
        return `icon3`;
      }
    }
  };

  const setBookmark = () => {
    if (myBookmark) {
      axios.delete(`/bookmarks/${coursePageId}`).then(res => {
        const count = res.data.bookmarkCount;
        setMyBookmark(false);
        setBookmarkCount(count);
      });
    } else {
      const data = {
        coursePageId: coursePageId,
      };
      axios.post(`/bookmarks`, data).then(res => {
        const count = res.data.bookmarkCount;
        setMyBookmark(true);
        setBookmarkCount(count);
      });
    }
  };

  const getProfileImageId = ({user}) => {
    if (user) {
      return user.profile_image_id || 0;
    }

    return 0;
  };

  const dateDiff = (date) => {
    if (date == undefined || date == null) {
      return '';
    }

    try {
      const today = new Date();
      const diffDay = Date.parse(date);

      var diff = Math.abs(today.getTime() - diffDay);
      diff = Math.ceil(diff / (1000 * 3600 * 24));

      if (diff > 30) {
        return '1달전';
      } else if (diff > 7) {
        return Math.floor(diff / 7) + '주전';
      } else {
        return `${diff}일전`;
      }
    } catch (e) {
      console.log(e);
    }

    return '';
  };

  return (
      course ? (
          <div className="container course-container">
            <div className="content">
              <p className="page-name">
                <span className="red">홈 </span><span className={'arrow'}>></span><span className="red">{school.name}</span><span className={'arrow'}>></span><span className="red">{department.name}</span><span className={'arrow'}>></span><span>{course.title}</span>
              </p>

              <div className="title-wrapper">
                <div className="title">
                  {course.title}
                </div>
                {
                  isMobile ?
                      <></>
                      :
                      <div className={`bookmark ${myBookmark ? 'active' : ''}`} onClick={setBookmark}>
                        <div className={'img'}></div>
                        <div className={'txt'}>
                          강의담기
                        </div>
                        <div className={'cnt'}>
                          {bookmarkCount}
                        </div>
                      </div>
                }

                <div className={`pass ${getPassName()}`}>
                </div>
              </div>

              <div className="course-info-wrapper">
                <div className="info">
                  <div className="sec">
                    <div className="k">
                      대학교
                    </div>
                    <div className="v">
                      {school.name}
                    </div>
                  </div>

                  <div className="sec">
                    <div className="k">
                      학과
                    </div>
                    <div className="v">
                      {department.name}
                    </div>
                  </div>
                </div>
                <div className="info">
                  <div className="sec">
                    <div className="k">
                      강의코드
                    </div>
                    <div className="v">
                      {course.course_code}
                    </div>
                  </div>

                  <div className="sec">
                    <div className="k">
                      교수명
                    </div>
                    <div className="v">
                      {professor.name}
                    </div>
                  </div>
                </div>
              </div>
              {
                isMobile ?
                    <div className={`bookmark ${myBookmark ? 'active' : ''}`} onClick={setBookmark}>
                      <div className={'img'}></div>
                      <div className={'txt'}>
                        강의담기
                      </div>
                      <div className={'cnt'}>
                        {bookmarkCount}
                      </div>
                    </div>
                    : <></>
              }

              <div className="questions-wrapper">
                <div className="title-wrapper">
                  Q&A({questions.length})
                </div>

                <ul className="question-list">
                  {
                    questions &&
                    questions.map((question) =>
                        <Link to={`/questions/${question.id}`}>
                          <li key={question.id} className="question-item">
                            <Question question={question}/>
                          </li>
                        </Link>
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
      ) : <></>
  );
};

export default QuestionList;