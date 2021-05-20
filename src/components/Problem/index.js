import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./index.scss";

const Index = ({problem}) => {
  return (
    <>
      <Link to={`/courses/${problem && problem.coursePageId}`}>  
        <div className="problem-wrap">
          <div className="problem-title-wrap">
            <p className="department">
              {problem && problem.course_page && problem.course_page.course.department.school.name} > {problem && problem.course_page && problem.course_page.course.department.name}
            </p>

            <p className="problem-title">
              {problem && problem.course_page && problem.course_page.course.title}
            </p>
          </div>

          <div className="thumbnail-wrap">
            <img src={problem && problem.cover_image_url} className="cover-img" />
          </div>
        </div>
      </Link>
    </>
  );
};

export default Index;
