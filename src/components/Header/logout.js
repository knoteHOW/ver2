import React from "react"
import { withRouter } from "react-router-dom"

function LogoutButton({ logout, history }) {
  const handleClick = () => {
    logout();
    history.push("/");
  };
  return <button className="logout" onClick={handleClick}>๋ก๊ทธ์์</button>
}

export default withRouter(LogoutButton)
