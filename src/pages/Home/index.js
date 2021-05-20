import {Link, useHistory} from 'react-router-dom'

import './index.scss'
import {useSelector} from "react-redux";
import {createRef, useEffect, useState} from "react";
import axios from "axios";
import * as actions from "../../actions";
import LoginHome from "./loginHome";
import DefaultHome from "./defaultHome";

const Home = () => {
  const user = useSelector((state) => state.user.user);

  const [schools, setSchools] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [courses, setCourses] = useState(null);

  const [school, setSchool] = useState(() => createRef());
  const [department, setDepartment] = useState(() => createRef());
  const [course, setCourse] = useState(() => createRef());

  const history = useHistory();


  useEffect(() => {
    window.scrollTo(0,0);
    axios.get('/schools').then(res => {
      setSchools(res.data.schools);

      axios.get(`/schools/${res.data.schools[0].id}/departments`).then(res1 => {
        setDepartments(res1.data.departments);

        axios.get(`/departments/${res1.data.departments[0].id}/courses`).then(res2 => {
          setCourses(res2.data.courses);
        });
      });
    });
  }, []);

  const onSchoolChanged = (event) => {
    const value = event.target.value;
    axios.get(`/schools/${value}/departments`).then(res => {
      setDepartments(res.data.departments);

      if (res.data.departments.length > 0) {
        axios.get(`/departments/${res.data.departments[0].id}/courses`).then(res2 => {
          setCourses(res2.data.courses);
        });
      } else {
        setCourses(null);
      }
    });
  };

  const onDepartmentChanged = (event) => {
    const value = event.target.value;
    axios.get(`/departments/${value}/courses`).then(res => {
      setCourses(res.data.courses);
    });
  };

  const onSearchClicked = () => {
    const s = school.current.value;
    const d = department.current.value;
    const c = course.current.value;
    history.push(`/search?school=${s}&department=${d}&course=${c}`);
  };

  return (
      <>
        <div className="home-wrap">
          <div className="home-container">
            <div className="home-back-img left-main"></div>
            <div className="home-back-img right-main"></div>
            <div className="home-top-img"></div>
            <div className="home-heading-area">
              <p>대학생은 도대체</p>
              <p>어디서 공부해야할까?</p>
            </div>
            <div className="home-heading-sub-area">
              <p>노트하우는 새로운 <span>대학생 스터디 문화를 만들었습니다.</span></p>
              <p>대학생 공부의 처음과 끝은 노트하우로!</p>
            </div>
            <div className="home-search-area">
              <select name="univ" id="home-univ-select" ref={school} onChange={onSchoolChanged}>
                {
                  (schools &&
                          schools.map((school) =>
                              <option value={school.id} key={`s-${school.id}`}>{school.name}</option>
                          )
                  )
                }
              </select>
              <select name="major" id="home-major-select" ref={department} onChange={onDepartmentChanged}>
                {
                  (departments &&
                          departments.map((department) =>
                              <option value={department.id} key={`d-${department.id}`}>{department.name}</option>
                          )
                  )
                }
              </select>
              <select name="lect" id="home-lect-select" ref={course}>
                {
                  (courses &&
                      courses.map((course) =>
                          <option value={course.id} key={`c-${course.id}`}>{course.title}</option>
                      )
                  )
                }
              </select>
              <div className="home-select-btn" onClick={onSearchClicked}>내 강의 찾아보기</div>
            </div>
          </div>
        </div>

        {
          user && user.user ?
            <LoginHome />
            :
            <DefaultHome />
        }
      </>
  )
}

export default Home;