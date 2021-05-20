import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import "./myPage.scss";
import { useHistory } from "react-router-dom";

import LeftDefaultMenu from "../../components/users/LeftDefaultMenu";
import Edit from "../../components/users/Edit";

const MyEdit = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    window.scrollTo(0,0);
  },[]);

  return (
      <div className="container my-container">
        <div className="content">
          <p className="page-name">홈 > My노트하우</p>

          <div className="grid">

            <LeftDefaultMenu />

            <div className="my-content">
              <p className="title">
                MY 정보
              </p>

              {
                user && user.user != null ?
                    <Edit />
                    :
                    ''
              }
            </div>
          </div>
        </div>
      </div>
  );
}

export default MyEdit;
