import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./myPage.scss";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import Pass from "../../components/Pass";

import { Pagination } from 'antd';
import LeftDefaultMenu from "../../components/users/LeftDefaultMenu";

const MyPass = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [passes, setPasses] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0,0);
    axios.get(`/users/passes?page=${page}`).then(res => {
      setUser(res.data.user);
      setPasses(res.data.passes);
      setTotalCount(res.data.totalCount);
    }).catch(error => {
      window.location.href = "/";
    });
  },[page]);

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  return (
      <div className="container my-container">
        <div className="content">
          <p className="page-name">홈 > My강의</p>

          <div className="grid">

            <LeftDefaultMenu currentMenu={'pass'} />

            <div className="my-content">
              <p className="title">
                MY 강의
              </p>

              <div className="list passes">
                <ul className="pass-list sub-list">
                  {
                    (passes &&
                        passes.map((pass) =>
                            <li key={pass.id}>
                              <Pass pass={pass} />
                            </li>
                        )
                    )
                  }
                </ul>
              </div>

              <Pagination size="small" current={page} total={totalCount} defaultPageSize={12} onChange={pageChanged} />
            </div>
          </div>
        </div>
      </div>
  );
}

export default MyPass;
