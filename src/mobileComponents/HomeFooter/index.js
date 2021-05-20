import UnivSelect from '../UnivSelect';
import './style.scss'

const HomeFooter = ({school, setSchool}) => {
  return (
    <>
      <div className="m-hf-wrap">
        <div className="m-hf-heading">
          (학교별로 준비된 강의가 다르므로 학교 선택하는 것을 추천드립니다.)
        </div>
        <div className="m-hf-body">
          <p>나의 <span>대학교를 선택</span>해주세요! 🏫</p>
          <UnivSelect 
            school={school}
            setSchool={setSchool}
          />
        </div>
      </div>
    </>
  )
}

export default HomeFooter;