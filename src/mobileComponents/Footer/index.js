import './style.scss'

const Footer = () => {
  return (
    <>
      <div className="m-footer-wrap">
        <div className="m-footer-container">
          <div className="m-footer-upper-box">
            <div className="m-footer-corp-box">
              <div className="m-footer-corp-logo">
                <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620708831338.png" alt="footer-logo"/>
              </div>
              <div className="m-footer-corp-descr">
                <p>노트하우는 대학에서의 새로운 스터디 문화를<br/>
                만들기 위해 노력하고 있습니다.</p>
              </div>
            </div>
            
          </div>
          <div className="m-footer-middle-box">
            <div className="m-footer-site-map-box">
                <p className="m-footer-site-map-header">노트하우</p>
                <p>홈</p>
                <p>채용</p>
                <p>팀 노트하우</p>
              </div>
              <div className="m-footer-site-map-box">
                <p className="m-footer-site-map-header">튜터</p>
                <p>지원하기</p>
                <p>튜터 가이드</p>
              </div>
              <div className="m-footer-site-map-box">
                <p className="m-footer-site-map-header">고객센터</p>
                <p>1:1 문의하기</p>
              </div>
            
          </div>
          <div className="m-footer-lower-box">
            <div className="m-footer-app-box">
              <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620709527320.png" alt="kakaotalk"/>
              <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620709541281.png" alt="instagram"/>
              <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620709553324.png" alt="facebook"/>
            </div>
            <div className="m-footer-detail-box">
              <p>이용약관</p>
              <p>개인정보 처리방침</p>
              <p>사업자 정보 확인</p>
            </div>
            <div className ="m-footer-info-box">
              <p>
              상호명 : 노트하우 주식회사 사업자번호 : 305-86-40712 대표 : 한영주 주소 : 대전광역시 유성구 대학로179번길 7-12, D-BRIDGE D3 203호 Call : 051-929-5431 통신판매번호 : 2020-대전서구-2194 노트하우 주식회사는 전자상거래 등에서의 소비자보호에 관한 법률에 따른 통신판매업과 통신판매중개업을 영위하고 있습니다. 노트하우 주식회사는 통신판매중개자로서 중개하는 통신판매에 관하여서는 통신판매의 당사자가 아니므로 어떠한 책임도 부담하지 아니합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Footer;