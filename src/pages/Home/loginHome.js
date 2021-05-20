import React, {useEffect, useState} from "react";
import axios from "axios";
import * as actions from "../../actions";
import './loginHome.scss';
import { Link } from 'react-router-dom';
import Pass from "../../components/Pass";
import Note from "../../components/Note";
import Problem from "../../components/Problem";
import Question from "../../components/Question";

const LoginHome = () => {

  const [passes, setPasses] = useState(null);
  const [notes, setNotes] = useState(null);
  const [problems, setProblems] = useState(null);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    axios.get('/passes').then(res => {
      setPasses(res.data.passes);
    });

    axios.get('/notes/recommends').then(res => {
      setNotes(res.data.notes);
    });

    axios.get('/problems/recommends').then(res => {
      setProblems(res.data.problems);
    });

    axios.get('/questions/recommends').then(res => {
      setQuestions(res.data.questions);
    });
  },[]);

  return (
      <div className="main-container">
        <div className="pass-container container">
          <div className="title-header">
            <div className="container-name">
              MY 강의
            </div>

            <Link to={`/users/passes`} className="more">
              더보기 >
            </Link>
          </div>

          <div className="pass-list-wrapper">
            <ul className="pass-list sub-list">
              {
                (passes &&
                    passes.map((pass) =>
                        <li key={pass.id} className="pass">
                          <Pass pass={pass} />
                        </li>
                    )
                )
              }
            </ul>
          </div>
        </div>

        {
          notes &&
          notes.length > 0 ?
              <div className="note-container container">
                <div className="title-header">
                  <div className="container-name">
                    우리 학과 친구들이 자주 보는 노트
                  </div>

                  <Link to={`/users/passes`} className="more">
                    더보기 >
                  </Link>
                </div>

                <div className="note-list-wrapper">
                  <ul className="note-list sub-list">
                    {
                      (notes &&
                          notes.map((note) =>
                              <li key={note.id} className="note">
                                <Note note={note}/>
                              </li>
                          )
                      )
                    }
                  </ul>
                </div>
              </div>
              :
              <></>
        }

        {
          problems &&
          problems.length > 0 ?
              <div className="problem-container container">
                <div className="title-header">
                  <div className="container-name">
                    이 문제로 연습해보면 어떨까요?
                  </div>

                  <Link to={`/search/problems`} className="more">
                    더보기 >
                  </Link>
                </div>

                <div className="problem-list-wrapper">
                  <ul className="problem-list sub-list">
                    {
                      (problems &&
                          problems.map((problem) =>
                              <li key={problem.id} className="problem">
                                <Problem problem={problem}/>
                              </li>
                          )
                      )
                    }
                  </ul>
                </div>
              </div>
              :
              <></>
        }

        {
          questions &&
          questions.length > 0 ?
              <div className="question-container container">
                <div className="title-header">
                  <div className="container-name">
                    지금, 궁금한 게 있다면? 둘러보세요
                  </div>

                  <Link to={`/search/questions`} className="more">
                    더보기 >
                  </Link>
                </div>

                <div className="question-list-wrapper">
                  <ul className="question-list sub-list">
                    {
                      (questions &&
                          questions.map((question) =>
                              <Link to={`/questions/${question.id}`}>
                                <li key={question.id} className="question">
                                  <Question question={question}/>
                                </li>
                              </Link>
                          )
                      )
                    }
                  </ul>
                </div>
              </div>
              :
              <></>
        }
      </div>
  )
};

export default LoginHome;