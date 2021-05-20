import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StarFilled} from '@ant-design/icons';
import './style.scss';

import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
}


  const ReviewCard = ({review}) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
    };

    return (
      <div>
        <div className="m-review-text">
          <p>317명의 실 사용</p>
          <p>대학생 후기</p>
        </div>
        <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621330004836.png" alt="home-review"/>
        {/* <h2> Single Item</h2> */}
        <Carousel
          interval={null} 
          nextIcon={<div className="click-btn"></div>}
          prevIcon={<div className="click-btn"></div>}
        >
          {review.map(item => 
            (
              <Carousel.Item>
                <div key={item.id}>
                  <div className="m-review-wrap">
                    <div className="m-review-box">
                      <StarFilled style={{color:"#c6a9e4"}}/>
                      <div className="m-review-box-text"> {item.text}</div>
                      <div className="m-review-box-writer"> {item.writer}</div>  
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            )
          )}  
        </Carousel>
        {/* <Slider {...settings}>
          {review.map(item => {
            return(
              <div key={item.id}>
                <div className="m-review-wrap">
                  <div className="m-review-box">
                    <StarFilled style={{color:"#c6a9e4"}}/>
                    <div className="m-review-box-text"> {item.text}</div>
                    <div className="m-review-box-writer"> {item.writer}</div>  
                  </div>
                </div>
              </div>
            )
          })}   
        </Slider> */}
      </div>
    );
  }

export default ReviewCard;