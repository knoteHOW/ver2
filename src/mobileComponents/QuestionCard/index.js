import { useState, useEffect } from 'react';

import './style.scss'
import { LikeOutlined } from '@ant-design/icons';

import axios from 'axios';

const QuestionCard = ({question, isPass=false}) => {
  // 답변이 있는경우
    // pass 구매 경우 -> Answer 보임 (case 1)
    // pass 비구매 경우 -> Answer 블라인드 처리 (case 2)
  // 답변이 없는경우
    // 답변을 기다리고 있습니다. (case 3)

  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    question && setLikeCount(question.like_count)
  }, [question])

  const getProfileImageId = ({user}) => {
    if (user) {
      return user.profile_image_id || 0;
    }

    return 0;
  };

  const sendLike = (id) => {
    axios.post(`/questions/${id}/like`).then(res => {
      console.log(res, 'res')
      setLikeCount(res.data.likeCount);
    });
  };

  const Body = ({data, type}) => {
    return(
      <div className={type === 'question' ? "qc-wrap" : "qc-answer-wrap qc-wrap"}>
        <div className="qc-header">
          <div className="profile-img">
            {
              data && data.user ? (
                <div className={`profile-img-${getProfileImageId(data.user)}`}></div>
              ) :
              (
                <img src={data && data.profile} alt="profile-img"/>
              )
            }
          </div>
          <div className="profile-text">
            <p className="user-nick">{data && data.user && data.user.nickname}</p>
            <p className="created-at">{data && data.user && data.user.updatedAt}</p>
          </div>
        </div>
        {type === 'question' ?
        (
          <Question data={data}/>
        ): 
        (
          <Answer data={data} type={type}/>
        )}
      </div>
    )
  }
  
  const Question = ({data}) => {
    return(
      <>
        <div className="qc-body">
          <div id="m-editor-base">
            <div 
              className="ck-editor__main"
              dangerouslySetInnerHTML={{ __html: data && data.content }}
            ></div>
          </div>
        </div>
        <div className="qc-footer">
          <div className="like">
            <LikeOutlined 
              className="like-icon" 
              onClick={() => sendLike(data.id)}
            />
            <p
              onClick={() => sendLike(data.id)}
            >{likeCount}</p>
          </div>
          <div className="comment">
            <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621231773808.png" alt="comment"/>
            <p>{data && data.comment}</p>
          </div>
        </div>
      </>
    )
  }

  const Answer = ({data, type}) => {
    return (
      <>
        <div className="qc-body">
          {type && type !== 'notpass' ? 
          (
            <div id="m-editor-base">
              <div 
                className="ck-editor__main"
                dangerouslySetInnerHTML={{ __html: data && data && data.content }}
              ></div>
            </div>
          ):
          (
            <div className="non-pass">
              <img className="blind-img" src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621406784803.png" alt="blind-img"/>
              <img className="lock-img" src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621407374603.png" alt="lock"/>
            </div>
          )}
        </div>
        <div className="qc-footer">
          <p className="more">더보기</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Body data={question} type={"question"}/>
      {
        question.answer ? (
          isPass ?
          (
            <Body data={question.answer} type={"answer"}/>
          ):
          (
            <Body data={question.answer} type={"notpass"}/>
          )
        ): (
          <div className="wait-wrap">
            <div className="wait-btn">답변을 기다리고 있습니다!</div>
          </div>
        )
      }
    </>
  )
}

export default QuestionCard;