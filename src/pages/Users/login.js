import React, {useState, useEffect} from 'react';
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import "./index.scss";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../../actions";

const LoginPage = () => {
  const token = "8951fb26d19aaacd94bf91b38334691d";
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [cookie, setCookie] = useCookies(['Authorization']);
  const onLoginKakao = (result) => {
    localStorage.setItem("socialInfo", JSON.stringify(result));

    const data = {
      loginProvider: 'kakao',
      loginUserId: result.profile.id,
      token: result.response.access_token
    };

    axios.post("/users/login", data).then(res => {
      setCookie('Authorization', res.data.token.access_token, {path: '/', maxAge: 86400});
      dispatch(actions.setUser(res.data.user));
      dispatch(actions.setCreator(res.data.creator));
      setUser(res.data.user);
      history.push("/");
    }).catch((e) => {
      if (e.response && e.response.data && e.response.data.errorCode == 10001) {
        history.push("/signup");
      }
    });
  }

  return (
      <div className="container login-container">

        <div className="btn-wrapper">
          <div className="content">
            <div className="logo">
              
            </div>

            <div className="page-num"></div>
            <div className="title">
              <p>
                Do you k<span className="orange">now</span> HOW To study?
              </p>
            </div>

            <KakaoLogin
                token={token}
                onSuccess={result => onLoginKakao(result)}
                onFailure={result => console.log(result)}
            />
          </div>
        </div>
        <div className="img-wrapper step1">
        </div>

      </div>
  );
}

export default LoginPage;
