import React from "react";
import Problem from "../Problem";
import BlankResult from "./BlankResult";
import {Pagination} from "antd";

const ProblemList = ({problems, isSummary, page, totalCount, pageChanged, query}) => {
  return (
      (problems && problems.length > 0) ?
          <div className="notes-wrapper sections">
            <div className="section-title">
              검색된 연습문제
            </div>

            <div className={"scroll-wrap"}>
              <ul className="section-list note-list">
                {
                  problems.map(problem =>
                      <li className="problem" key={problem.id}>
                        <Problem problem={problem}/>
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

export default ProblemList;
