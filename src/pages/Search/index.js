import React, { useState, useEffect, createRef } from 'react';
import queryString from 'query-string';
import axios from "axios";
import {Form, Input, Select, Checkbox, Tabs} from "antd";
import Favorite from "../../components/Search/Favorite";
import All from "../../components/Search/All";

import "./index.scss";
import {useDispatch, useSelector} from "react-redux";
import CourseList from "../../components/Search/CourseList";
import NoteList from "../../components/Search/NoteList";
import ProblemList from "../../components/Search/ProblemList";
import QuestionList from "../../components/Search/QuestionList";

const { Option } = Select;
const { TabPane } = Tabs;

const SearchPage = ({location}) => {
  const query = queryString.parse(location.search);
  const [school, setSchool] = useState(null);
  const [department, setDepartment] = useState(null);
  const [course, setCourse] = useState(null);
  const [q, setQ] = useState(query.q);
  const [searchQuery, setSearchQuery] = useState(() => createRef());

  const [schools, setSchools] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [courses, setCourses] = useState(null);

  const [category, setCategory] = useState('all');

  const [results, setResults] = useState(null);

  const [page, setPage] = useState(null);

  const [show, setShow] = useState(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    window.scrollTo(0,0);
    axios.get('/schools').then(res => {
      if (query.school) {
        setSchool(res.data.schools.find((x) => x.id == query.school));

        axios.get(`/schools/${query.school}/departments`).then(res1 => {
          if (query.department) {
            setDepartment(res1.data.departments.find((x) => x.id == query.department));

            axios.get(`/departments/${query.department}/courses`).then(res2 => {
              setCourse(res2.data.courses.find((x) => x.id == query.course));
              setCourses(res2.data.courses);
              setShow(true);
            });
          } else {
            setShow(true);
          }

          setDepartments(res1.data.departments);
        });
      } else {
        setShow(true);
      }

      setSchools(res.data.schools);
      if (query.school || query.q) {
        handleFormSubmit();
      }
    });
  }, []);

  const onSchoolChanged = (value) => {
    axios.get(`/schools/${value}/departments`).then(res => {
      setDepartments(res.data.departments);
    });
  };

  const onDepartmentChanged = (value) => {
    axios.get(`/departments/${value}/courses`).then(res => {
      setCourses(res.data.courses);
    });
  };

  const getSchoolInfo = () => {
    var infos = [];
    if (school && schools && schools.length > 0) {
      const s = schools.filter(sc => sc.id === school);
      if (s && s.length > 0) {
        infos.push(s[0].name);

        if (department && departments && departments.length > 0) {
          const d = departments.filter(dp => dp.id === department);
          if (d && d.length > 0) {
            infos.push(d[0].name);

            if (course && courses && courses.length > 0) {
              const c = courses.filter(c => c.id === course);
              if (c && c.length > 0) {
                infos.push(c[0].title);
              }
            }
          }
        }
      }
    }

    return infos.join(' > ');
  };

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  useEffect(() => {
    handleFormSubmit();
  }, [page]);

  useEffect(() => {
    handleFormSubmit();
  }, [category]);

  const onFavoriteClicked = (event) => {
    setQ(event.target.dataset.favorite);
    form.setFieldsValue({query: event.target.dataset.favorite});
  };

  const handleFormSubmit = () => {
    form.validateFields()
        .then((values) => {
          // search
          var queryString = [`category=${category}`];

          if (values.school) {
            setSchool(values.school);
            queryString.push(`school=${values.school}`);
          }

          if (values.department) {
            setDepartment(values.department);
            queryString.push(`department=${values.department}`);
          }

          if (values.course) {
            setCourse(values.course);
            queryString.push(`course=${values.course}`);
          }

          if (values.query) {
            setQ(values.query);
            queryString.push(`q=${values.query}`);
          }

          if (category != 'all') {
            queryString.push(`count=12`);
          }

          if (page) {
            queryString.push(`page=${page}`);
          }

          if (queryString.length == 0) {
            return;
          }

          axios.get(`/search?${queryString.join('&')}`).then(res => {
            setResults(res.data.results);
          });
        })
        .catch((errorInfo) => {});
  };

  const changeCategory = (c) => {
    if (category == 'all') {
      setPage(null);
    } else {
      setPage(1);
    }
    setCategory(c);
  };

  const [form] = Form.useForm();
  return (
      show ?
          <>
            <div className="container search-container">
              <Form
                  form={form}
                  name="basic"
                  initialValues={{
                    school: school ? school.id : null,
                    department: department ? department.id : null,
                    course: course ? course.id : null,
                    query: q,
                    courseReadyStatus: false
                  }}
              >

                <div className="select-wrapper">
                  <Form.Item
                      name="school"
                      className="frm-select"
                  >
                    <Select
                        showSearch
                        placeholder=""
                        optionFilterProp="children"
                        onChange={onSchoolChanged}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                      {schools
                      && schools.map(s =>
                          <Option value={s.id} key={`s-${s.id}`}>{s.name}</Option>
                      )}
                    </Select>
                  </Form.Item>

                  <Form.Item
                      name="department"
                      className="frm-select"
                  >
                    <Select
                        showSearch
                        placeholder=""
                        optionFilterProp="children"
                        onChange={onDepartmentChanged}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                      {departments
                      && departments.map(d =>
                          <Option value={d.id} key={d.id}>{d.name}</Option>
                      )}
                    </Select>
                  </Form.Item>

                  <Form.Item
                      name="course"
                      className="frm-select full"
                  >
                    <Select
                        showSearch
                        placeholder=""
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                      {courses
                      && courses.map(c =>
                          <Option value={c.id} key={c.id}>{c.title}</Option>
                      )}
                    </Select>
                  </Form.Item>

                  <Form.Item
                      name="courseReadyStatus"
                      valuePropName="checked"
                  >
                    <Checkbox>노트하우 준비중 강의</Checkbox>
                  </Form.Item>
                </div>

                <Form.Item
                    name="query"
                >
                  <Input.Search placeholder="검색어를 입력하세요." onSearch={handleFormSubmit} ref={searchQuery} />
                </Form.Item>
              </Form>

              <Favorite onFavoriteClicked={onFavoriteClicked} />

              {
                results ? (
                        <div className="sections search-result">
                          <div className="section-title">
                            {getSchoolInfo} 검색결과
                          </div>

                          <div className="result-wrapper">
                            <Tabs defaultActiveKey={category} onChange={changeCategory}>
                              <TabPane tab="전체" key="all">
                                <All searchResults={results} query={q} />
                              </TabPane>
                              <TabPane tab="강의" key="course">
                                <CourseList courses={results.courses.courses} isSummary={false} page={page} totalCount={results.courses.totalCount} pageChanged={pageChanged} query={q} />
                              </TabPane>
                              <TabPane tab="노트" key="note">
                                <NoteList notes={results.notes.notePages} isSummary={false} page={page} totalCount={results.notes.totalCount} pageChanged={pageChanged} query={q} />
                              </TabPane>
                              <TabPane tab="연습문제" key="problem">
                                <ProblemList problems={results.problems.problems} isSummary={false} page={page} totalCount={results.problems.totalCount} pageChanged={pageChanged}  query={q}/>
                              </TabPane>
                              <TabPane tab="Q&A" key="question">
                                <QuestionList questions={results.questions.questions} isSummary={false}  age={page} totalCount={results.questions.totalCount} pageChanged={pageChanged}  query={q}/>
                              </TabPane>
                            </Tabs>
                          </div>
                        </div>
                    ) :
                    <></>
              }
            </div>
          </>
          :
          <></>
  );
};

export default SearchPage;