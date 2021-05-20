import React from "react";
import Question from "../Question";
import {Pagination} from "antd";
import BlankResult from "./BlankResult";

const QuestionList = ({questions, isSummary, page, totalCount, pageChanged, query}) => {
  return (
      (questions && questions.length > 0) ?
          <div className="question-wrapper sections">
            <div className="section-title">
              검색된 Q&A
            </div>

            <div className={"scroll-wrap"}>
              <ul className="section-list question-list">
                {
                  questions.map(question =>
                      <li className="question" key={question.id}>
                        <Question question={question}/>
                      </li>
                  )
                }
              </ul>
            </div>

            {
              !isSummary ?
                  <Pagination size="small" current={page} total={totalCount} defaultPageSize={12}
                              onChange={pageChanged}/>
                  :
                  <></>
            }
          </div>
          :
          isSummary ?
              <></>
              :
              <BlankResult query={query} />
  );
};

export default QuestionList;
