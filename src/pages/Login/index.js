import React, {useState, useEffect} from 'react';
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import "./index.scss";
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

  // useEffect(() => {
  //   if (inform) {
  //     history.push('/');
  //   }
  // }, [inform])


  useEffect(() => {
    window.scrollTo(0,0);
    if (user && user.token) {
      setCookie('Authorization', user.token.access_token, {path: '/', maxAge: 200000 });
      window.location.href = "/"  
    }
    if (signup) {
      history.push("/signup");
    }
    // if (user && user.creator) {
    //   history.push("/users/me");
    // }
    // if (user && !user.creator) {
    //   history.push("/");
    // }
  }, [user, signup])

  return (
    <div className="login-wrap">
      <div className="login-container">
        <div className="btn-wrapper">
          <div className="content">
            <div className="logo" onClick={()=>history.push('/')} style={{ cursor: "pointer" }}>
              <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620110288952.png" alt="logo"/>
            </div>

            <div className="page-num">
              <div className="step step-on">1</div>
              <div className="line"></div>
              <div className="step">2</div>
            </div>
            <div className="title">
              <p>
                Do you k<span className="orange">now</span> HOW To study?
              </p>
            </div>

            <KakaoLogin
              token={token}
              onSuccess={result => onLoginKakao(result)}
              onFailure={result => console.log(result)}
              className="kakao-btn"
            />
          </div>
        </div>
        <div>
          <div className="img-wrapper step1"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
