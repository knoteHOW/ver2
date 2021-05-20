import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./index.scss";
import { Pagination, Switch } from 'antd';
import SingleSwitch from "../SinggleSwitch";

const Subscribe = () => {
  const [subscribes, setSubscribes] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`/passes?page=${page}`).then(res => {
      setSubscribes(res.data.passes);
      setTotalCount(res.data.totalCount.length);
    });
  }, [page]);

  const getPassName = (subscribe) => {
    if (subscribe) {
      let passName;
      if (subscribe.pass_type == 0) {
        passName = '연습문제+Q&A Pass';
      } else if (subscribe.pass_type == 1) {
        passName = '노트 Pass';
      } else {
        passName = '올인원 Pass';
      }

      return `${subscribe.course_page.course.title} ${passName}`;
    }
    return '';
  };

  const getSubscribeTerms = (subscribe) => {
    if (subscribe) {
      return `${subscribe.start_at.substring(0, 10)}~${subscribe.end_at.substring(0, 10)}`
    }

    return '';
  };

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  return (
      <div className={"subscribes-container"}>
        <ul className={"subscribe-list"}>
          <li className={"row list-title"}>
            <div className={"pass-type"}>
              구매이용권
            </div>
            <div className={"terms"}>
              이용 가능 기간
            </div>
            <div className={"next-payment-date"}>
              다음 결제일
            </div>
            <div className={"toggle"}>
              PASS 정기 결제
            </div>
          </li>

          {
            (subscribes &&
                subscribes.map((subscribe) =>
                    <li key={subscribe.id} className={"row"}>
                      <div className={"pass-type"}>
                        {getPassName(subscribe)}
                      </div>
                      <div className={"terms"}>
                        {getSubscribeTerms(subscribe)}
                      </div>
                      <div className={"next-payment-date"}>
                        {subscribe.end_at.substring(0, 10)}
                      </div>
                      <div className={"toggle"}>
                        <SingleSwitch subscribe={subscribe} />
                      </div>
                    </li>
                )
            )
          }
        </ul>

        <Pagination size="small" current={page} total={totalCount} defaultPageSize={5} onChange={pageChanged} />
      </div>
  );
};

export default Subscribe;