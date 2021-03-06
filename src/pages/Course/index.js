import React, {useState, useEffect, useRef, createRef, useLayoutEffect} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import axios from "axios";
import Question from "../../components/Question";
import "./index.scss";
import {useSelector} from "react-redux";

const CourseDetail = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [school, setSchool] = useState(null);
  const [department, setDepartment] = useState(null);
  const [professor, setProfessor] = useState(null);
  const [notePages, setNotePages] = useState(null);
  const [problems, setProblems] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [newQuestion, setNewQuestion] = useState(() => createRef());
  const [profileImageId, setProfileImageId] = useState(null);

  const [myBookmark, setMyBookmark] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const [pass, setPass] = useState(null);

  const [isMobile, setIsMobile] = useState(null);

  useLayoutEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', updateSize);
  }, []);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    window.scrollTo(0,0);
    axios.get(`/courses/${courseId}`).then(res => {
      const c = res.data.coursePage;
      setProfessor(c.course.professor);
      setDepartment(c.course.department);
      setSchool(c.course.department.school);
      setNotePages(c.note_pages);
      setProblems(c.problems);
      setPass(res.data.pass);
      setCourse(c.course);

      setQuestions(res.data.questions);
      setBookmarkCount(res.data.bookmarkCount);
      setMyBookmark(res.data.bookmark != null);
    }).catch(error => {
    });

    if (user && user.useRef) {
      const imageId = user.user.profile_image_id || 0;
      setProfileImageId(imageId);
    }
  }, []);

  const ThumbnailSection = ({sectionType, thumbnailImageUrl, count}) => {
    return (
        <div className="thumbnail-section">
          <img src={thumbnailImageUrl} className="thumbnail" />
          <div className="count">
            {`${count} ${sectionType == 'note' ? '?????????' : '??????'}`}
          </div>

          {/*TODO: ???????????? or ?????????????????? ?????? */}
          <Link to={`/passes?tab=order&course=${courseId}`} className="link">
            {sectionType == 'note' ? '?????? ????????????' : '?????? ????????????'}
          </Link>
        </div>
    )
  };

  const BlindSection = ({sectionType, thumbnailImageUrl, count}) => {
    return (
        <div className="blind-section thumbnail-section">
          <div className="lock"></div>
          <div className="blur"></div>
          <img src={thumbnailImageUrl} className="thumbnail" />
          <div className="count">
            {`${count} ${sectionType == 'note' ? '?????????' : '??????'}`}
          </div>

          <Link to={`/passes?tab=order&course=${courseId}`} className="link">
            ??????????????????
          </Link>
        </div>
    )
  };

  const BlankSection = ({sectionType}) => {
    return (
        <div className="blank-section thumbnail-section">
          <p className="desc">
            ????????? ??????????????????
          </p>
          <p className="desc">
            ??????????????? ????????? ????????? ?????????????????????!
          </p>

          {/*TODO: link ?????? */}
          <Link to={`/creator`} className="creator">
            {
              sectionType === 'note' ? '???????????? ???????????????' : '???????????? ????????? ??????'
            }
          </Link>
        </div>
    )
  };

  const NoteSection = ({notePages, pass}) => {
    if (notePages && notePages.length > 0) {
      if (pass && (pass.pass_type == 1 || pass.pass_type == 2)) {
        return (
            <ThumbnailSection sectionType="note" count={notePages[0].noteCount} thumbnailImageUrl={notePages[0].cover_image_url} />
        );
      } else {
        return (
            <BlindSection sectionType="note" count={notePages[0].noteCount} thumbnailImageUrl={notePages[0].cover_image_url} />
        );
      }
    } else {
      return (
          <BlankSection sectionType="note" />
      );
    }
  };

  const ProblemSection = (problems, pass) => {
    if (problems && problems.length > 0) {
      if (pass && (pass.pass_type == 0 || pass.pass_type == 2)) {
        return (
            <ThumbnailSection sectionType="problem" count={problems.length} thumbnailImageUrl={problems[0].cover_image_url} />
        );
      } else {
        return (
            <BlindSection sectionType="problem" count={problems.length} thumbnailImageUrl={problems[0].cover_image_url} />
        )
      }
    } else {
      return (
          <BlankSection sectionType="problem" />
      )
    }
  };

  const submitNewQuestion = () => {
    const params = {
      content: newQuestion.current.value,
      coursePageId: courseId
    };
    axios.post(`/questions`, params).then(res => {
      var q = questions || [];
      q.push(res.data.question);

      setQuestions(q);
      newQuestion.current.value = '';
    });
  };

  const setBookmark = () => {
    if (myBookmark) {
      axios.delete(`/bookmarks/${courseId}`).then(res => {
        const count = res.data.bookmarkCount;
        setMyBookmark(false);
        setBookmarkCount(count);
      });
    } else {
      const data = {
        coursePageId: courseId,
      };
      axios.post(`/bookmarks`, data).then(res => {
        const count = res.data.bookmarkCount;
        setMyBookmark(true);
        setBookmarkCount(count);
      });
    }

  };

  const NewQuestion = ({pass}) => {
    return (
        (pass && (pass.pass_type == 0 || pass.pass_type == 2)) ?
            <div className="new-question-wrapper">
              <div className={`profile-img img-${profileImageId}`}></div>
              <div className="input-wrapper">
                <textarea className="textarea" ref={newQuestion}></textarea>
              </div>
              <div className="button-wrapper">
                <div className="submit-btn" onClick={submitNewQuestion}>
                  ????????????
                </div>
              </div>
            </div>
            :
            <></>
    );
  };

  const BlankQuestion = () => {
    return (
        <div className="blank-question-wrapper">
          <p>????????? ?????? ????????? ???????????????!</p>
          <p>???????????? ????????? ??????????????? ?????????????????????</p>
        </div>
    );
  };

  const QuestionSection = ({questions, pass}) => {
    return (
        <>
          {
            (questions && questions.length > 0) ?
                <ul className="question-list">
                  {
                    questions.map((question) =>
                        <li key={question.id}>
                          <Question question={question}/>
                        </li>
                    )
                  }
                </ul>
                :
                <BlankQuestion />
          }

          {
            isMobile ?
                <></>
                :
                <NewQuestion pass={pass}/>
          }
        </>
    );
  };

  const getPassName = () => {
    if (pass) {
      return `icon${pass.pass_type}`;
    } else {
      if (notePages && notePages.length > 0 && problems && problems.length > 0) {
        if (myBookmark) {
          return `icon4`;
        } else {
          return `icon3`;
        }
      } else {
        if (myBookmark) {
          return `icon6`;
        } else {
          return `icon5`;
        }
      }
    }
  }

  return (
      course ? (
              <div className="container course-container">
                <div className="content">
                  <p className="page-name">
                    <span className="red">??? </span><span className={'arrow'}>></span><span className="red">{school.name}</span><span className={'arrow'}>></span><span className="red">{department.name}</span><span className={'arrow'}>></span><span>{course.title}</span>
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
                              ????????????
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
                          ?????????
                        </div>
                        <div className="v">
                          {school.name}
                        </div>
                      </div>

                      <div className="sec">
                        <div className="k">
                          ??????
                        </div>
                        <div className="v">
                          {department.name}
                        </div>
                      </div>
                    </div>
                    <div className="info">
                      <div className="sec">
                        <div className="k">
                          ????????????
                        </div>
                        <div className="v">
                          {course.course_code}
                        </div>
                      </div>

                      <div className="sec">
                        <div className="k">
                          ?????????
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
                            ????????????
                          </div>
                          <div className={'cnt'}>
                            {bookmarkCount}
                          </div>
                        </div>
                        : <></>
                  }

                  <div className="note-problem-wrapper sub-wrapper">
                    <div className="wrap">
                      <p className="section-title"> ???????????? </p>
                      <p className="section-desc">
                        {course.title}??? ?????? ????????? ????????? ????????? ????????? ????????????.
                      </p>
                      <NoteSection notePages={notePages} pass={pass} />
                    </div>

                    <div className="wrap">
                      <p className="section-title"> ???????????? </p>
                      <p className="section-desc">
                        {course.title}??? ????????? ??????????????? ????????? ??? ?????? ????????? ????????????.
                      </p>
                      <ProblemSection problems={problems} pass={pass} />
                    </div>
                  </div>

                  <div className="question-wrapper sub-wrapper">
                    <div className="sub-title-wrapper">
                      <div>
                        <p className="section-title"> Q&A </p>
                        <p className="section-desc">
                          {course.title}??? ?????? ????????? ???, ????????? ???, ???????????? ????????? ???????????? ????????????!
                        </p>
                      </div>
                      <Link to={`/courses/${courseId}/course_questions`} className={'link'}>
                        ?????????
                      </Link>
                    </div>

                    <div className={"question-list-wrapper"}>
                      <QuestionSection questions={questions} pass={pass} />
                    </div>
                  </div>
                </div>
              </div>
          ) :
          <></>
  );
};

export default CourseDetail;
