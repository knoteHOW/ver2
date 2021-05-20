import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Card, Col, Row } from 'antd';

const CoursePage = () => {
  const [coursepage, setCoursepage] = useState(null);
  const [notepages, setNotepages] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [problems, setProblems] = useState(null);

  useEffect(() => {
    axios.get(
      "/posts/coursepage?id=1"
    )
      .then(res => {
        console.log(res);
        if (res.data.CoursePage === null) return
        setNotepages(res.data.CoursePage.note_pages);
        setQuestions(res.data.CoursePage.questions);
        setProblems(res.data.CoursePage.problems);
        setCoursepage(res.data.CoursePage);
      })
  }, [])

  return (
    <>
      <h1>Course</h1>

      <h2>Note Page</h2>
      <Row gutter={16}>
        {notepages
        && notepages.map(notepage =>
          <Col span={4}>
            <Card hoverable bordered={true} cover={<img alt="example" src={notepage.cover_image_url} />}>
             {notepage.title}
            </Card>
          </Col>
        )}
      </Row>

      <h2>Question</h2>

      <Row gutter={16}>
        {questions
          && questions.map(question =>
            <Col span={4}>
              <Link to={`/questionpage?id=${question.id}`}>
                <Card hoverable bordered={true} cover={<img alt="example" src={question.cover_image_url} />}>
                  {question.content}
                </Card>
              </Link>
            </Col>
        )}
      </Row>

      <h2>Problem</h2>

      <Row gutter={16}>
        {problems
          && problems.map(problem =>
            <Col span={4}>
              <Card hoverable bordered={true} cover={<img alt="example" src={problem.cover_image_url} />}>
                {problem.content}
              </Card>
            </Col>
        )}
      </Row>
    </>
  )
}

export default CoursePage;