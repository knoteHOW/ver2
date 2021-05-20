import { Switch, Route } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Creator from "../pages/Creator";
import CoursePage from "../pages/CoursePage"
import QuestionPage from "../pages/QuestionPage";
import QuestionList from "../pages/QuestionList";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import NewOrder from "../pages/OrderPage/newOrder";

import Receipt from "../pages/OrderPage/receipt";

import SearchPage from "../pages/Search";

import MyPage from "../pages/MyPages/myPage";
import MyPass from "../pages/MyPages/myPass";
import MyQuestion from "../pages/MyPages/myQuestion";
import MyInquiry from "../pages/MyPages/myInquiry";
import MyNotification from "../pages/MyPages/myNotification";
import MyEdit from "../pages/MyPages/myEdit";
import NewPaymentMethodPage from "../pages/MyPages/newPaymentMethodPage";

import PassPage from "../pages/PassPage";

import CourseDetail from "../pages/Course";

import Test from "../pages/Editor";
import Page404 from '../pages/Page404'

const PcRouter = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/creator"} component={Creator} />
        <Route exact path={"/coursepage"} component={CoursePage} />
        <Route exact path={"/questions/:questionId"} component={QuestionPage} />
        <Route exact path={"/login"} component={LoginPage} />
        <Route exact path={"/signup"} component={SignupPage} />
        <Route exact path={"/orders/:coursePageId/new"} component={NewOrder} />

        <Route exact path={"/orders/:orderId/receipt"} component={Receipt} />

        <Route exact path={"/courses/:courseId"} component={CourseDetail} />
        <Route exact path={"/courses/:courseId/course_questions"} component={QuestionList} />

        <Route exact path={"/search"} component={SearchPage} />

        <Route exact path={"/passes"} component={PassPage} />

        <Route exact path={"/users/me"} component={MyPage} />
        <Route exact path={"/users/edit"} component={MyEdit} />
        <Route exact path={"/users/passes"} component={MyPass} />
        <Route exact path={"/users/my_questions"} component={MyQuestion} />
        <Route exact path={"/users/inquiries"} component={MyInquiry} />
        <Route exact path={"/users/notifications"} component={MyNotification} />
        <Route exact path={"/users/paymethods"} component={NewPaymentMethodPage} />
        <Route exact path={"/users/paymethods/new"} component={NewPaymentMethodPage} />

        <Route exact path={"/test"} component={Test} />
        <Route component={Page404} />
      </Switch>
      <Footer />
    </>
  )
}

export default PcRouter;