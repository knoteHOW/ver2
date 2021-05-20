import React from "react"
import { withRouter } from "react-router-dom"

function LogoutButton({ logout, history }) {
  const handleClick = () => {
    logout();
    history.push("/");
  };
  return <button className="logout" onClick={handleClick}>로그아웃</button>
}

export default withRouter(LogoutButton)
