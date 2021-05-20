import { Rate } from 'antd';
import { StarFilled} from '@ant-design/icons';
import './style.scss';

const Review = ({review}) => {
  return(    
    <div className="m-review-container">
      <div className="m-top">
        <img src={review.profile}/>
        <div className="m-top-right">
          <div className="nickname">
            {review.writer}
          </div>
          <div className="date-score">
            <div className="date">
              {review.date}
            </div>
            <div className="date">
              일전
            </div>
            <div className="score">
              <Rate disabled value={4} style={{ color: "#EF0050", fontSize: "13px"}}/>
            </div>
          </div>
        </div>
      </div>
      <div className="m-bottom">
        {review.text}
      </div>
    </div>    
  )
}

export default Review;