import './style.scss'

const StepCard = ({step}) => {
  return(
    <div className="m-step-wrap">
      <div className="m-step-container">
        <div className="m-step-header">
          <p>{step.title}</p>  
        </div>  
        <div className="m-step-container-title">
          <p>{step.header1}</p>
          <p>{step.header2}</p>
        </div>
        <div className="m-step-container-info">
          <p>{step.info}</p>
        </div>
        <div className="m-step-container-photo">
          <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621331414994.png" alt="note-img"/>
        </div>
      </div>
          
    </div>
  )
}

export default StepCard;