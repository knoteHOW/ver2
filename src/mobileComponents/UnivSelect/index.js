import './style.scss'
import axios from "axios";
import React, {useState, useEffect, useRef} from 'react';
import { Form, Input, Button, Select } from 'antd';
import DropdownButton from 'react-bootstrap/DropdownButton'
const { Option } = Select;

const UnivSelect = ({setSchool=false, school=false}) => {

  const [schoolsInfo, setSchoolsInfo] = useState(null);  

  const onSchoolChanged = (value) => {
    setSchool(value);
  };

  useEffect(() => {
    axios.get('/schools').then(res => {
      setSchoolsInfo(res.data.schools);
    });
  }, [])

  console.log(school, 'school')

  return(
    <div className="m-form">  
      <Form.Item
        //label="학교"
        name="school"
        rules={[{required: true, message: '학교를 입력해주세요.'}]}
      >
        {
          school ?
          (
            <Select
              placeholder={school}
              showArrow={false}
              disabled={true}
            >
            </Select>
          ):
          (
            <Select
              showSearch
              showArrow={false}
              placeholder="대학교 선택하기"
              optionFilterProp="children"
              onChange={onSchoolChanged}
              filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              { schoolsInfo
              && schoolsInfo.map(school =>
                <Option value={school.name} key={school.id}>{school.name}</Option>
              )}
            </Select>
          )
        }
      </Form.Item>
    </div>
  )
}

export default UnivSelect;