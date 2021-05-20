import { useState, useEffect } from 'react';
import axios from 'axios';

import './style.scss'
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const DetailFooter = ({ isPass=false, isContain=false, cnt=0, id=null }) => {
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [isBookmark, setIsBookmark] = useState(false);

  useEffect(() => {
    setIsBookmark(isContain);
    setBookmarkCount(cnt);
  }, [isContain, cnt]);

  const setBookmark = async() => {
    if (isBookmark) {
      try {
        const result = await axios.delete(`/bookmarks/${id}`)
        if(result.status === 200) {
          const count = result.data.bookmarkCount;
          setIsBookmark(false);
          setBookmarkCount(count);
        } else {
          throw result
        }
      } catch(e) {
        console.log(e);
      }
    } else {
      try {
        const result = await axios.post('/bookmarks', {
          coursePageId: id
        })
        if(result.status === 200) {
          const count = result.data.bookmarkCount;
          setIsBookmark(true);
          setBookmarkCount(count);
        }
      } catch(e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="df-wrap">
      <div className="study-alarm">
        <span className="number">17명</span>
        <span className="school">의 고려대학교 학생</span>
        이 튜터와 함께 공부 중입니다.
      </div>
      <div className="btn-area">
        {
          isBookmark ? 
          (
            <div
              onClick={setBookmark} 
              className="contain-btn on-btn"><BookmarkIcon 
            />강의 담기 {bookmarkCount}</div>
          ):
          (
            <div
              onClick={setBookmark}  
              className="contain-btn"><BookmarkBorderOutlinedIcon 
            />강의 담기 {bookmarkCount}</div>
          )
        }
        {isPass ?
        (
          <div className="question-btn">튜터에게 질문하기</div>
        ):
        (
          <div className="purchase-btn">PASS 구매하기</div>
        )}
      </div>
    </div>
  )
}

export default DetailFooter;