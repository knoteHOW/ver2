import React, {useState, useEffect, useLayoutEffect, createRef} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import axios from 'axios';
import "./index.scss";

import { Card, Comment } from 'antd';

const QuestionPage = ({location}) => {
  const {questionId} = useParams();

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [comments, setComments] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [pass, setPass] = useState(null);

  const [myBookmark, setMyBookmark] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const [course, setCourse] = useState(null);
  const [school, setSchool] = useState(null);
  const [department, setDepartment] = useState(null);
  const [professor, setProfessor] = useState(null);

  const [coursePageId, setCoursePageId] = useState(null);
  const [isMobile, setIsMobile] = useState(null);

  const [newComment, setNewComment] = useState(() => createRef());

  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    window.scrollTo(0,0);
    axios.get(`/questions/${questionId}`).then(res => {
      setUser(res.data.user);
      setQuestion(res.data.question);
      setAnswer(res.data.question.answer);
      if (res.data.question.answer != null) {
        setComments(res.data.question.answer.comments);
      }
      setLikeCount(res.data.likeCount);
      setCoursePageId(res.data.question.coursePageId);

      axios.get(`/courses/${res.data.question.coursePageId}`).then(res1 => {
        const c = res1.data.coursePage;
        setProfessor(c.course.professor);
        setDepartment(c.course.department);
        setSchool(c.course.department.school);
        setPass(res1.data.pass);
        setCourse(c.course);

        setBookmarkCount(res1.data.bookmarkCount);
        setMyBookmark(res1.data.bookmark != null);
      }).catch(error => {
      });

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

  const adoptAnswer = () => {
    if (answer.status != 0) {
      return;
    }

    axios.put(`/questions/${question.id}/adopt`).then(res => {
      setAnswer(res.data.answer);
    });
  };

  const submitNewComment = () => {
    const params = {
      content: newComment.current.value,
    };

    axios.post(`/questions/${questionId}/comment`, params).then(res => {
        setComments(res.data.comments);
    });
  };

  const sendLike = () => {
    axios.post(`/questions/${questionId}/like`).then(res => {
      setLikeCount(res.data.likeCount);
    });
  };

  const NewCommentSection = () => {
    return (
        <div className="new-comment-wrapper">
          <div className={`profile-img img-${getProfileImageId(user)}`}></div>
          <div className="input-wrapper">
            <textarea className="textarea" ref={newComment}></textarea>
          </div>
          <div className="button-wrapper">
            <div className="submit-btn" onClick={submitNewComment}>
              댓글 달기
            </div>
          </div>
        </div>
    )
  };

  const CommentSection = () => {
    return (
        <>
          {
            comments &&
            comments.map(comment =>
                <div className={'comment'}>
                  <div className="user-info">
                    <div className={`profile-img img-${getProfileImageId(comment.user)}`}>
                    </div>

                    <div className="name-info">
                      <p className="name">
                        {comment.user.nickname}
                      </p>
                      <p className="date">
                        {dateDiff(comment.createdAt)}
                      </p>

                    </div>
                  </div>

                  <div className="q-content">
                    {comment.content}
                  </div>
                </div>
            )
          }

          <NewCommentSection />
        </>
    )
  };

  const AnswerSection = () => {
    if (pass && (pass.pass_type == 0 || pass.pass_type == 2)) {
      return (
          <div className="answers-wrapper question-wrapper">
            <div className={`answer`}>
              <div className="user-info">
                <div className={`profile-img img-${getProfileImageId(answer.creator.user)}`}>
                </div>

                <div className="name-info">
                  <p className="name">
                    {answer.creator.nickname}
                  </p>
                  <p className="date">
                    {dateDiff(answer.createdAt)}
                  </p>
                </div>

                {
                  question.userId == user.id ?
                      <div className={`adopt-btn st-${answer.status}`} onClick={adoptAnswer}>
                      </div>
                      :<></>
                }
              </div>

              <div className="q-content">
                {answer.content}
              </div>
            </div>

            <CommentSection />
          </div>
      );
    }

    return (
        <div className="answers-wrapper blind">
          <div className="lock"></div>
          <div className="blur"></div>
          <img className="thumbnail" />

          <Link to={`/passes?tab=order&course=${coursePageId}`} className="link">
            패스구매하기
          </Link>
        </div>
    );
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

              <div className="question-wrapper">
                <div className="question">
                  <div className="user-info">
                    <div className={`profile-img img-${getProfileImageId(question.user)}`}>
                    </div>

                    <div className="name-info">
                      <p className="name">
                        {question.user.nickname}
                      </p>
                      <p className="date">
                        {dateDiff(question.createdAt)}
                      </p>
                    </div>

                    <div className={'count-wrapper'}>
                      <div className={'like-cnt-wrapper'} onClick={sendLike}>
                        <div className={'like-icon'}></div>
                        <div className={'cnt'}>{likeCount}</div>
                      </div>
                      <div className={'comment-cnt-wrapper'}>
                        <div className={'comment-icon'}></div>
                        <div className={'cnt'}>{comments ? comments.length : 0}</div>
                      </div>
                    </div>
                  </div>

                  <div className="q-content">
                    {question.content}
                  </div>
                </div>
              </div>

              {
                answer ? (
                        <AnswerSection />
                    ) :
                    <></>
              }
            </div>
          </div>
      ) : <></>
  );
};

export default QuestionPage