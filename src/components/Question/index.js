import React, {useState, useEffect} from 'react';
import "./index.scss";

const Index = ({question}) => {
  const u = question && question.user || {}
  const profileImageId = u.profile_image_id || 0;
  const createProfileImageId = question && question.answer ? question.answer.creator.user.profile_image_id : 0;

  const dateDiff = (date) => {
    if (date == undefined || date == null) {
      return '';
    }

    try {
      const today = new Date();
      const diffDay = Date.parse(date);

      var diff = Math.abs(today.getTime() - diffDay);
      diff = Math.ceil(diff / (1000 * 3600 * 24));

      if (diff > 30) {
        return '1달전';
      } else if (diff > 7) {
        return Math.floor(diff / 7) + '주전';
      } else {
        return `${diff}일전`;
      }
    } catch (e) {
      console.log(e);
    }

    return '';
  };

  return (
      <div className="question-wrap">
        <div className="question">
          <div className="user-info">
            <div className={`profile-img img-${profileImageId}`}>
            </div>

            <div className="name-info">
              <p className="name">
                {question && question.user && question.user.nickname}
              </p>
              <p className="date">
                {dateDiff(question && question.createdAt)}
              </p>
            </div>

            <div className={'count-wrapper'}>
              <div className={'like-cnt-wrapper'}>
                <div className={'like-icon'}></div>
                <div className={'cnt'}>{question.likeCount || 0}</div>
              </div>
              <div className={'comment-cnt-wrapper'}>
                <div className={'comment-icon'}></div>
                <div className={'cnt'}>{question.commentCount || 0}</div>
              </div>
            </div>
          </div>

          <div className="q-content">
            {question && question.content}
          </div>
        </div>

        <div className={`answer ${question && question.answer ? '' : 'blank'}`}>
          {
            question && question.answer ? (
                <>
                  <div className="user-info">
                    <div className={`profile-img img-${createProfileImageId}`}>
                    </div>

                    <div className="name-info">
                      <p className="name">
                        {question && question.user && question.user.nickname}
                      </p>
                      <p className="date">
                        {dateDiff(question && question.answer && question.answer.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="q-content">
                    {question && question.answer && question.answer.content}
                  </div>
                </>
            ) : (
                <></>
            )
          }
        </div>
      </div>
  );
};

export default Index;
