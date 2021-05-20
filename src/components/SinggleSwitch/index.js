import React, {useState, useEffect} from 'react';
import { Pagination, Switch } from 'antd';
import axios from "axios";

const SingleSwitch = ({subscribe}) => {

  const onChangeStatus = (checked, event) => {
    axios.put(`/passes/${subscribe.id}`).then(res => {
      subscribe.active = checked;
    });
  };

  return (
      <Switch defaultChecked={subscribe.active} onChange={onChangeStatus} />
  );
};

export default SingleSwitch;
