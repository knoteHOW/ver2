import React from "react";
import Pass from "../Pass";
import {Pagination} from "antd";
import BlankResult from "./BlankResult";

const CourseList = ({courses, isSummary, page, totalCount, pageChanged, query}) => {
  return (
      (courses && courses.length > 0) ?
          <div className="courses-wrapper sections">
            <div className="section-title">
              검색된 강의
            </div>

            <div className={"scroll-wrap"}>
              <ul className="section-list note-list">
                {
                  courses.map(pass =>
                      <li key={pass.id}>
                        <Pass pass={pass} />
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

export default CourseList;
