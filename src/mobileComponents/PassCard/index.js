import './style.scss'

const PassCard = ({pass}) => {
  return(
    <div className="m-pass-container">
      <div className="m-pass-container-top">
        <div className="m-pass-title">
          <p>{pass.title}</p>
        </div>
        <div className="m-pass-check">
          <div className="m-pass-check-header">
            <p>{pass.header}</p>
          </div>
          <div className="m-pass-check-body">
            <p>rkddml</p>
            <p>rkddml</p>
            <p>rkddml</p>
          </div>          
        </div>
        <div className="m-pass-info">
            <p>{pass.info}</p>
        </div>
        <div className="m-pass-caution">
            <p>{pass.caution}</p>
        </div>
      </div> 
      <div className="m-pass-container-bottom">
        <div className="m-pass-percent">
          <p>{pass.percent}</p>
          <p>%</p>
        </div>
        <div className="m-pass-price-area">
          <div className="m-pass-originprice">
            <p>{pass.originprice}</p>
            <p>원</p>
          </div>
          <div className="m-pass-disprice">
            <p>월 </p>
            <p>{pass.originprice*(100-pass.percent)/100}</p>
            <p>원</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassCard;