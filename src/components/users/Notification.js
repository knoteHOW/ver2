import React, {useState, useEffect} from 'react';
import "./notification.scss";

const getModelName = (notification) => {
  let modelName;
  switch (notification.objectable_type) {
    case 'note_pages':
      modelName = '[노트]';
      break;
    case 'problems':
      modelName = '[연습문제]';
      break;
    case 'questions':
      modelName = '[Q&A]';
      break;
    case 'answers':
      modelName = '[Q&A]';
      break;
    default:
      modelName = '';
  }

  return modelName;
};

const Notification = ({notification}) => {
  return (
      <div className="notification-wrap">
        <div className="notification-title-wrap">
          {
            notification.isNew ?
                <div className="new-obj">NEW</div> :
                ''
          }

          <div className="model-name">
            {
              getModelName(notification)
            }
          </div>

          <div className="message">
            {notification.message}
          </div>
        </div>
        <p className="created-at">
          {notification.createdAt}
        </p>
      </div>
  );
};

export default Notification;
