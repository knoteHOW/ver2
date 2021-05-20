import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Collapse, Modal } from 'antd';
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss'

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code.js';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock.js';
import Plain from '../../plugin/plain/plain.js';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageResizeEditing from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting';
import ImageResizeButtons from '@ckeditor/ckeditor5-image/src/imageresize/imageresizebuttons';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert'
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import Linked from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import MathType from '@wiris/mathtype-ckeditor5/src/plugin';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';

const Practice = () => {
  const [cookie, setCookie] = useCookies(['course-id']);
  const [selectIndex, setSelectIndex] = useState([0,0]);
  const [chapter, setChapter] = useState(null);
  const [problemContent, setProblemContent] = useState('');
  const [solutionContent, setSolutionContent] = useState('');
  const [chapterModal, setChapterModal] = useState(false);
  const [problemIndex, setProblemIndex] = useState(false);
  
  const { inform, user } = useSelector((state) => ({
    inform: state.user.inform,
    user: state.user.user
  }));

  const chapterContent = useRef([]);
  const chapterNum = useRef(0);
  const problemNum = useRef(0);

  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0,0);

    // 연습문제 정보 가져오기
    axios.get(
      `https://ver2.knotehow.com/creators/problemsets/5`,
    )
    .then(res => {  
      console.log(res, 'res')
      setChapter(res.data.problemSets[0].problem_chapters);
    })
    .catch(err => {
      console.log(err);
    })

    // 강의 page id 초기화
    return () => {
      setCookie('course-id', -1, {path: '/', maxAge: 2000000 });
    }
  }, []);

  useEffect(() => {
    const editor = document.querySelectorAll('.ck-editor');
    if(editor[0] && editor[1]) {
      editor[0].remove();
      editor[1].remove();
    }
    selectIndex && setProblemIndex(selectIndex[1]+1);
    if (selectIndex && chapter) {
      ClassicEditor
      .create( document.querySelector( `#practice-${selectIndex[0]}${selectIndex[1]}` ), editorConfiguration )
      .then( editor => {
        editor.setData(chapter[selectIndex[0]].problems[selectIndex[1]].content);
        // editor.setData("<p>1번 문제</p>");
        editor.isReadOnly = true;
      })
      .catch( error => {
          console.error( error.stack );
      } );
      ClassicEditor
      .create( document.querySelector( `#solution-${selectIndex[1]}${selectIndex[1]}` ), editorConfiguration )
      .then( editor => {
        editor.setData(chapter[selectIndex[0]].problems[selectIndex[1]].solutions[0].content);
        // editor.setData("<p>1번 해결법</p>");
        editor.isReadOnly = true;
      })
      .catch( error => {
          console.error( error.stack );
      } );
    }

    if(selectIndex && chapter && chapter.length>0) {
      setProblemContent(chapter[selectIndex[0]].problems[selectIndex[1]].content);
      setSolutionContent(chapter[selectIndex[0]].problems[selectIndex[1]].solutions[0].content);
    }
  }, [selectIndex, chapter])

  const goNext = () => {
    if(selectIndex[1] === chapter[selectIndex[0]].problems.length-1) {
      setSelectIndex([selectIndex[0],0])
    } else {
      setSelectIndex([selectIndex[0],selectIndex[1]+1])
    }
  }

  const goPrev = () => {
    if(selectIndex[1] === 0) {
      setSelectIndex([selectIndex[0],chapter[selectIndex[0]].problems.length-1])
    } else {
      setSelectIndex([selectIndex[0],selectIndex[1]-1])
    }
  }

  const setInputValue = (e) => {
    if(e.key === 'Enter') {
      const num = parseInt(e.target.value);
      if (num === 0) {
        setSelectIndex([selectIndex[0],0]);
        setProblemIndex(1);
      } else if (num > chapter[selectIndex[0]].problems.length) {
        setSelectIndex([selectIndex[0],chapter[selectIndex[0]].problems.length-1]);
        setProblemIndex(chapter[selectIndex[0]].problems.length);
      } else {
        setSelectIndex([selectIndex[0],num-1]);
        setProblemIndex(num);
      }
    }
  }

  const editorConfiguration = {
    plugins: [ 
      Essentials, 
      Bold, 
      Paragraph, 
      Code, 
      Alignment,
      AutoImage, 
      Autoformat,
      Autosave,
      BlockQuote,
      CodeBlock,
      Plain,
      SimpleUploadAdapter,
      HorizontalLine,
      Image,
      ImageCaption,
      ImageToolbar,
      ImageUpload,
      ImageInsert,
      ImageResizeEditing, 
      ImageResizeButtons,
      Indent,
      Linked,
      List,
      MathType,
      Table,
      TableCellProperties,
      TableToolbar,
      TextTransformation,
    ],
    toolbar: {
      items: [ 'bold', 'alignment', 'imageUpload', 'insertTable', 'MathType', 'codeBlock', 'Plain', 'link', 'blockQuote', 'undo', 'redo', 'horizontalLine' ],
      viewportTopOffset: 80,
    },
    typing: {
      transformations: {
          remove: [
              'symbols',
              'quotes',
              'arrowLeft',
              'arrowRight'
          ],
          extra: [
              { from: '->', to: '→' },
          ],
      }
    },
    simpleUpload: {
      uploadUrl: 'https://api.knotehow.com/api/upload/editor',
      // withCredentials: true,
      // headers: {
      // }
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          view: {
            name: 'p',
            classes: 'h-text'
          },
          title: '본문',
          class: 'ck-heading_text ck-heading-custom',
        }
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn', 'tableRow', 'mergeTableCells',
        'tableCellProperties'
      ],
    },
    link: {
      defaultProtocol: 'https://'
    },
    image: {
      resizeOptions: [
        {
          name: 'imageResize:original',
          value: null,
          icon: 'original'
        },
        {
          name: 'imageResize:50',
          value: '50',
          icon: 'medium',
        },
        {
          name: 'imageResize:75',
          value: '75',
          icon: 'large',
        }
      ],
      toolbar: [
        'imageResize:50',
        'imageResize:75',
        'imageResize:original',
      ]
    }
  };

  return (
    <>
      <div className='m-practice-wrap'>
        <div className="m-practice-body">
          <div className="m-practice-body--problem-area">
            <div className="m-problem-chapter-title">{`Chapter.${chapter && chapter[selectIndex[0]].title}`}</div>
            <div className="m-problem-title">{`문제 ${selectIndex[1]+1}`}</div>
            <div className="m-practice-editor">
              <div className="m-control-btn m-next-btn" onClick={goNext}></div>
              <div className="m-control-btn m-prev-btn" onClick={goPrev}></div>
              {
                selectIndex &&
                (
                  <>
                    <div id={`practice-${selectIndex[0]}${selectIndex[1]}`}></div>
                  </>
                )
              }
            </div>
            <div className="m-practice-body--solution-area">
              <div className="m-solution-title">솔루션</div>
              <div className="m-solution-editor">
                {
                  selectIndex &&
                  (
                    <>
                      <div id={`solution-${selectIndex[1]}${selectIndex[1]}`}></div>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div 
          onClick={() => setChapterModal(true)}
          className="m-practice-menubar"
        >
          <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621218136211.png" alt="menu-btn"/>
        </div>
      </div>
      <Modal
        title=""
        centered
        visible={chapterModal}
        onOk={() => setChapterModal(false)}
        onCancel={() => setChapterModal(false)}
        closable={false}
        className="m-practice--chapter-modal"
      >
        <div className="m-chapter-header">
          <p>Content</p>
          <img 
            src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621218287617.png" 
            alt="close"
            onClick={() => setChapterModal(false)}
          />
        </div>
        <div className="m-chapter-body">
          {chapter && chapter.map((ch,idx) =>
            <div 
              className={(idx === selectIndex[0] ? "m-selected-chapter" : "") + " m-chapter-list"}
              onClick={() => {
                setSelectIndex([idx,0])
                // setChapterModal(false)
              }}
            >
              Ch.{ch.title}
            </div>  
          ) }
        </div>
        <div className="m-chapter-footer">
          <div
            onClick={goPrev} 
            className="m-chapter-prev-arrow">
            <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621218256831.png" alt="left-arrow"/>
          </div>
          <div className="m-chapter-problem-area">
            <p>문제</p>
            <input 
              type="text"
              value={problemIndex}
              onChange={(e) => setProblemIndex(e.target.value)}
              onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')}
              onKeyPress={(e) => setInputValue(e)}
            />
            <p className="m-chapter-problem-leng">/{chapter && chapter[selectIndex[0]].problems && chapter[selectIndex[0]].problems.length}</p>
          </div>
          <div 
            onClick={goNext} 
            className="m-chapter-next-arrow"
          >
            <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621218272523.png" alt="right-arrow"/>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Practice;