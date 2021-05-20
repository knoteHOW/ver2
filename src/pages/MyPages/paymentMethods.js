import React, {useState, useEffect} from 'react';
import axios from "axios";
// import "./index.scss";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import {Button, Form, Input} from "antd";

const PaymentMethods = () => {
  const history = useHistory();

  return (
      <div className="container payment-method-container">
      </div>
  );
}

export default PaymentMethods;
