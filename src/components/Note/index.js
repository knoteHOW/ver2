import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./index.scss";
const Index = ({note}) => {
  console.log(note)

  const statusText = () => {
    if (note && note.status == 0) {
      return '작성중';
    } else if (note && note.status == 1) {
      return '승인대기';
    } else if (note && note.status == 2) {
      return '승인완료';
    } else if (note && note.status == 3) {
      return '반려';
    }
  };

  return (
    <>
      <Link to={`/courses/${note && note.coursePageId}`}>
        <div className="note-wrap">
          <div className="note-title-wrap">
            <p className="department">
              {note && note.course_page && note.course_page.course.department.school.name} > {note && note.course_page && note.course_page.course.department.name}
            </p>

            <p className="note-title">
              {note && note.course_page && note.course_page.course.title}
            </p>
          </div>

          <div className="thumbnail-wrap">
            <img src={note && note.cover_image_url} className="cover-img" />
          </div>
        </div>
      </Link>
    </>
  );
};

export default Index;
