import './style.scss';
import CourseDetail from '../../mobilePages/CourseDetail';

const DetailHead = ({course, tutor}) =>{
  console.log(course, 'course')
  return(
    <div className="m-head-container">
      <div className="m-head-title">
        {course && course.coursePage && course.coursePage.course && course.coursePage.course.title}
      </div>
      <div className="m-head-body">
        <div className="m-head-type">대학교</div>
        <div className="m-head-info">{course && course.coursePage && course.coursePage.course && course.coursePage.course.department && course.coursePage.course.department.school && course.coursePage.course.department.school.name}</div>
      </div>
      <div className="m-head-body">
        <div className="m-head-type">계열</div>
        <div className="m-head-info">공학계열 · 자연계열</div>
      </div>
      <div className="m-head-body">
        <div className="m-head-type">교수</div>
        <div className="m-head-info">{course && course.coursePage && course.coursePage.course && course.coursePage.course.professor && course.coursePage.course.professor.name}</div>
      </div>
      <div className="m-head-tutor">
        <div className="m-head-tutor-title">튜터정보</div>
        <div className="m-head-tutor-info-wrap">
        <div className="m-head-info-left">
          <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470409022.png"/>
          <div className="m-head-info-tutor">
            <p>Tutor</p>
            <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621414156484.png" alt="hand"/>
          </div>
        </div>
        <div className="m-head-info-right">
          <div className="m-head-info-name">{tutor.name}</div>
          <div className="m-head-info-info">
            <p>
              {tutor.info}
            </p>
          </div> 
          <div className="m-head-info-intro">
            <p>
              {tutor.intro}
            </p>
          </div>  
        </div>
      </div>
      </div>      
    </div>
  )
}

export default DetailHead;