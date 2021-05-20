import React, {useState} from 'react';
import './style.scss'



const NoteCard = ({course}) => {
  const [myBookmark, setMyBookmark] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  
  return (
    <div className="notecard-wrap">
      <div className="notecard-container">
        <div className={`notecard-bookmark ${myBookmark ? 'notecard-active' : ''}`} onClick={setMyBookmark}>
          <div className="notecard-img"></div>
        </div>      
        <div className="notecard-image"/>            
        <div className="notecard-text-header">
          <div className="notecard-text-school">
              <p>{course.univ}</p>
          </div>
          <div className="notecard-text-subject">
              <p>{course.subject}</p>
          </div>
        </div>
        <div className="notecard-text-title">
          <p>{course.title}</p>
          <p>개념노트</p>
        </div>
        <div className="notecard-text-sub">
          <p>[</p>
          <p>{course.subcode}</p>
          <p>]</p>
          <p>{course.writer}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteCard;