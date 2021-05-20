import { Switch, Route } from "react-router-dom";

import Header from '../mobileComponents/Header';
import Home from '../mobilePages/Home';
import loginHome from '../mobilePages/Home'
import Users from '../mobilePages/Users';
import Login from '../mobilePages/Login';
import Signup from '../mobilePages/Signup';
import Note from '../mobilePages/Note';
import Practice from '../mobilePages/Practice';
import QuestionList from '../mobilePages/QuestionList';
import QuestionPage from '../mobilePages/QuestionPage';
import CourseDetail from '../mobilePages/CourseDetail';
import MyQna from '../mobilePages/MyKnoteHow/MyQna';
import MyKnoteHow from "../mobilePages/MyKnoteHow";
import MyInquiry from "../mobilePages/MyKnoteHow/MyInquiry";
import MyNoti from "../mobilePages/MyKnoteHow/MyNoti";

const MobileRouter = () => {
  return (
    <>
      <Header/>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/coursedetail/:courseId"} component={CourseDetail} />
        <Route exact path={"/coursedetail2"} component={MyKnoteHow} />
        <Route exact path={"/me"} component={Users} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/signup"} component={Signup} />
        <Route exact path={"/practice"} component={Practice} />
        <Route exact path={"/note"} component={Note} />
        <Route exact path={"/questionlist"} component={QuestionList} />
        <Route exact path={"/questions/:questionId"} component={QuestionPage} />

        <Route exact path={"/mypage/mycourse"} component={MyKnoteHow} />
        <Route exact path={"/mypage/myqna"} component={MyQna} />
        <Route exact path={"/mypage/myinquiry"} component={MyInquiry} />
        <Route exact path={"/mypage/mynoti"} component={MyNoti} />
      </Switch>
    </>
  )
}

export default MobileRouter;