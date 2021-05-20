import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import './style.css'

const ModalBtn = ({type, target, modalSwitch, setModalSwitch, evalData, content=false }) => {
  if(type === 2) {
    return (
      <>
        <div
          className="my-modal--btn my-modal--btn-half" 
          onClick={() => {
            setModalSwitch({
              ...modalSwitch,
              [target[0]]: false
            })
          }}
        >{content[0]}</div>
        <div 
          className="my-modal--btn my-modal--btn-half" 
          onClick={() => {
            evalData();
            setModalSwitch({
              ...modalSwitch,
              [target[0]]: false,
              [target[1]]: true
            })
          }}
        >{content[1]}</div>
      </>
    )
  } else {
    return (
      <>
        <div 
          className="my-modal--btn" 
          onClick={() => {
            setModalSwitch({
              ...modalSwitch,
              [target]: false
            })
          }}
        >확인</div>
      </>
    )
  }
}

const MyModal = ({width, customClass, content, hasTarget, target, modalSwitch, setModalSwitch, type, evalData=false}) => {
  return(
    <Modal
      title=""
      centered
      width={width}
      visible={modalSwitch[target[0]]}
      onOk={() => setModalSwitch({
        ...modalSwitch,
        [target[0]]: false
      })}
      onCancel={() => setModalSwitch({
        ...modalSwitch,
        [target[0]]: false
      })}
      className={`my-modal ${customClass}`}
    >
      <div className="my-modal--header">
        {content[0].map(con => 
          (con)
        )}
      </div>
      <div className="my-modal--body">
        {content[1]}
      </div>
      <div className="my-modal--footer">
        <ModalBtn 
          type={type}
          target={target}
          modalSwitch={modalSwitch}
          setModalSwitch={setModalSwitch}
          evalData={evalData}
          content={content[2] && content[2]}
        />
      </div>
    </Modal>
  )
}

export default MyModal;