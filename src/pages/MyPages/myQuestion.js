import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./myPage.scss";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import Index from "../../components/Question";

import { Pagination } from 'antd';
import LeftDefaultMenu from "../../components/users/LeftDefaultMenu";

const MyQuestion = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0,0);
    axios.get(`/users/questions?page=${page}`).then(res => {
      setUser(res.data.user);
      setQuestions(res.data.questions);
      setTotalCount(res.data.totalCount);
    }).catch(error => {
      window.location.href = "/";
    });
  },[page]);

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  return (
      <div className="container my-container">
        <div className="content">
          <p className="page-name">홈 > My강의</p>

          <div className="grid">

            <LeftDefaultMenu currentMenu={'questions'}/>

            <div className="my-content">
              <p className="title">
                MY Q&A
              </p>

              <div className="list questions">
                <ul className="question-list sub-list">
                  {
                    (questions &&
                        questions.map((question) =>
                            <li key={question.id}>
                              <Index question={question} />
                            </li>
                        )
                    )
                  }
                </ul>
              </div>

              <Pagination size="small" current={page} total={totalCount} defaultPageSize={12} onChange={pageChanged} />
            </div>
          </div>
        </div>
      </div>
  );
}

export default MyQuestion;
