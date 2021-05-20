import "./style.scss";
import CourseCard from '../../mobileComponents/CourseCard';
import SortDropDown from "../../mobileComponents/SortDropDown";

const course = [{
  id:1,
  "title":"컴퓨터프로그래밍I",
  "univ":"고려대학교",
  "subject":".공학계열.자연계열",
  "subcode":"CH101",
  "writer":"에이쁠"
},
{
  id:2,
  "title":"컴퓨터프로그래밍I",
  "univ":"고려대학교",
  "subject":".공학계열.자연계열",
  "subcode":"CH101",
  "writer":"에이쁠"
},
{
  id:3,
  "title":"컴퓨터프로그래밍I",
  "univ":"고려대학교",
  "subject":".공학계열.자연계열",
  "subcode":"CH101",
  "writer":"에이쁠"
}
]

const Mycourse = ()=>{
  return(
    <>
      <div className="m-my-sortdown">
        <SortDropDown />
      </div> 
      <div className="m-my-course">
        {course.map(item=>{
          return(
            <div className="align" key={item.id}>
              <CourseCard course={item}/>
            </div>
          )
        })}    
      </div> 
    </>
  )
}
export default Mycourse;