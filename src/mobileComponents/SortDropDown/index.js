import { useState } from 'react';
import { Menu, Dropdown, Radio, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './style.scss'

const SortDropDown = () => {
  const [type, setType] = useState('인기순')
  const sorting = e => {
    setType(e.target.value);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Radio.Group onChange={sorting} value={type}>
          <Space direction="vertical">
            <Radio value={'인기순'}>인기순</Radio>
            <Radio value={'가나다순'}>가나다순</Radio>
            <Radio value={'추천순'}>추천순</Radio>
          </Space>
        </Radio.Group>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown 
        overlay={menu}
        trigger={['click']}
      >
        <a className="sort-dropdown" onClick={e => e.preventDefault()}>
          {type} 
          <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1620111747888.png" alt="arrow"/>
        </a>
      </Dropdown>
    </>
  )
}

export default SortDropDown;