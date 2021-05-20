import React, {useState} from "react";

const BlankResult = ({query}) => {
  return (
      <div className={"blank-results-wrapper"}>
        <p className={"message"}>
          <span className={"orange"}>{query}</span> 에 대한 노하우 검색 결과가 없습니다.
        </p>
        <p className={"desc"}>
          조금만 기다려주시면 감사하겠습니다!
        </p>
      </div>
  )
};

export default BlankResult;
