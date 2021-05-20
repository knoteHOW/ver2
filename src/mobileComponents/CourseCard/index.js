import React, {useState} from 'react';
import './style.scss'

const CourseCard = ({course}) => {
  const [myBookmark, setMyBookmark] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  return (
    <div className="coursecard-wrap">
      <div className="coursecard-container">            
        <div className="coursecard-image">
          <div className={`coursecard-bookmark ${myBookmark ? 'coursecard-active' : ''}`} onClick={setMyBookmark}>
            <div className="coursecard-img"></div>
          </div>  
        </div>           
        <div className="coursecard-text-header">
          <div className="coursecard-text-school">
            <p>{course.univ}</p>    
          </div>
          <div className="coursecard-text-subject">
            <p>{course.subject}</p>
          </div>
        </div>
        <div className="coursecard-text-title">
          <p>{course.title}</p>
        </div>
        <div className="coursecard-text-sub">
          <p>[</p>
          <p>{course.subcode}</p>
          <p>]</p>
          <p>{course.writer}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseCard;