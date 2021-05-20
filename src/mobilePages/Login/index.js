import React, {useState, useEffect} from 'react';
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import "./style.scss";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { USER_LOGIN_REQUEST } from '../../reducers/user';
import queryString from "query-string";

const LoginPage = ({location}) => {
  const token = "8951fb26d19aaacd94bf91b38334691d";
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, signup, inform } = useSelector((state) => ({
    user: state.user.user,
    signup: state.user.signup,
    inform: state.user.inform
  }));

  const [cookie, setCookie] = useCookies(['Authorization']);
  const [redirectUrl, setRedirectUrl] = useState(null);


  useEffect(() => {
    window.scrollTo(0,0);
    const query = queryString.parse(location.search);
    if (query && query.url) {
      setRedirectUrl(query.url);
    } else {
      setRedirectUrl("/");
    }
  }, []);

  const onLoginKakao = (result) => {
    localStorage.setItem("socialInfo", JSON.stringify(result));

    const data = {
      loginProvider: 'kakao',
      loginUserId: result.profile.id,
      token: result.response.access_token
    };

    dispatch({
      type: USER_LOGIN_REQUEST,
      data
    });
  }

  useEffect(() => {
    window.scrollTo(0,0);
    if (user && user.token) {
      setCookie('Authorization', user.token.access_token, {path: '/', maxAge: 200000 });
      window.location.href = "/"  
    }
    if (signup) {
      history.push("/signup");
    }
  }, [user, signup])

  return (
    <div className="m-login-wrap">
      <div className="m-login-container">
        <img 
          className="m-logo"
          src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620110288952.png" 
          alt="logo"
          onClick={()=>history.push('/')}
        />

        <div className="m-page-num">
          <div className="m-step m-step-on">1</div>
          <div className="m-line"></div>
          <div className="m-step">2</div>
        </div>
        <div className="m-title">
          <p>대학교 스터디는</p>
          <p><span className="m-orange">노트하우</span>에서!</p>
        </div>

        <div className="m-img-area">
          <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1615709916825.png" alt="background"/>
        </div>

        <KakaoLogin
          token={token}
          onSuccess={result => onLoginKakao(result)}
          onFailure={result => console.log(result)}
          className="m-kakao-btn"
        />
      </div>
    </div>
  );
}

export default LoginPage;
