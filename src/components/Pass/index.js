import React, {useState, useEffect} from 'react';
import "./index.scss";
import {Link} from "react-router-dom";
const Index = ({pass}) => {
  return (
      <div>
        <Link to={`/courses/${pass && pass.coursePageId}`} className="pass-wrap">
          <div className="info-wrap">
            <p className="department">
              {pass && pass.course_page.course.department.school.name} > {pass && pass.course_page.course.department.name}
            </p>
            <p className="course-name">
              {pass && pass.course_page.course.title}
            </p>
          </div>

          <div className="icon-wrap">
            <div className={`pass icon${pass && pass.pass_type}`}></div>
          </div>
        </Link>
      </div>
  );
};

export default Index;
