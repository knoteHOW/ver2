import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import DefaultHome from './defaultHome';
import LoginHome from './loginHome';

const Home = () => {
  const [cookie, setCookie] = useCookies(['Authorization']);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(cookie && cookie.Authorization && cookie.Authorization != -1) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [cookie])

  useEffect(() => {
    console.log(isLogin, 'isLogin')
  }, [isLogin])

  if(isLogin) {
    return (
      <LoginHome />
    )
  }
  return (
   <DefaultHome />
  )
}

export default Home;