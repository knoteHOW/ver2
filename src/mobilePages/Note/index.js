import { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import axios from 'axios';
import './style.scss';
import './style.css'
import { Spin, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
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


const Note = () => {
  const keyValue = useRef(0);
  let history = useHistory();

  const [cookie, setCookie] = useCookies(['course-id']);
  const [chapter, setChapter] = useState([]);
  const [chapterBtn, setChapterBtn] = useState({});
  const [update, setUpdate] = useState(false);
  const [chapterHeight, setChapterHeight] = useState({});
  const [chapterModal, setChapterModal] = useState(false);
  const [content, setContent] = useState('')

  const [isOn, setIsOn] = useState(false);
  const { inform, user } = useSelector((state) => ({
    inform: state.user.inform,
    user: state.user.user
  }));

  const editorNum = useRef(0);
  const waitIcon = <LoadingOutlined style={{ fontSize: 66 }} spin />;


  const onAppend = (elem, f) => {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
            if (m.addedNodes.length) {
              f();
            }
            if (m.removedNodes.length) {
              f();
            }
        })
    })
    observer.observe(elem, {childList: true})
  }

  const openChap2 = (chapter) => {
    const closeBtn = document.querySelector(`.m-chapter-toolbar--on-${chapter.key}`);
    const wrapper = document.querySelector(`.m-open-area--${chapter.key} .m-chapter-toolbar--heading2-menu`);
    if(!closeBtn) {
      let temp_chapBtn = JSON.parse(JSON.stringify(chapterBtn))
      let temp_chapHeight = JSON.parse(JSON.stringify(chapterHeight))
      temp_chapBtn[`h-${chapter.key}`] = true;
      temp_chapHeight[`h-${chapter.key}`] = wrapper.clientHeight;
      setChapterBtn(temp_chapBtn);
      setChapterHeight(temp_chapHeight);
    } else {
      let temp_chapBtn = JSON.parse(JSON.stringify(chapterBtn))
      let temp_chapHeight = JSON.parse(JSON.stringify(chapterHeight))
      temp_chapBtn[`h-${chapter.key}`] = false;
      temp_chapHeight[`h-${chapter.key}`] = 0;
      setChapterBtn(temp_chapBtn);
      setChapterHeight(temp_chapHeight);
    }
  }

  const changeHeight = () => {
    let temp_chapHeight = JSON.parse(JSON.stringify(chapterHeight))
    const otherBtn = [...document.querySelectorAll('.m-chapter-toolbar--on')] 
    otherBtn.map(btn => {
      const id = `h-${btn.nextSibling.nextSibling.classList[1].substring(11,)}`;
      temp_chapHeight[id] = btn.nextSibling.nextSibling.children[0].clientHeight;
      setChapterHeight(temp_chapHeight);
    })
  }

  const getNoteData = async () => {
    try {
      const result = await axios.get
      (
        `https://ver2.knotehow.com/creators/notepageinfo/121`
      )
      console.log(result, 'result'  )
      if(result.status === 200) {
        editorNum.current === 0 && ClassicEditor
        .create( document.querySelector( '#m-editor-create' ), editorConfiguration )
        .then( editor => {
          const content = document.querySelector('.ck-content');
          editor.isReadOnly = true
          onAppend(content, function() {
            setUpdate(true);
          })
          editorNum.current = 1
          editor.setData(result.data.NotePage.notes[0].content);
          setIsOn(true);
        })
        .catch( error => {
            console.error( error.stack );
        } );
      }
    } catch(e) {
      console.log(e);
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
      Heading,
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
      items: [ 'heading', '|', 'bold', 'alignment', 'inlineimage', 'imageUpload', 'insertTable', 'MathType', 'codeBlock', 'Plain', 'link', 'blockQuote', 'undo', 'redo', 'horizontalLine' ],
      viewportTopOffset: 0,
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
    },
    heading: {
      options: [
        {
          model: 'heading1',
          view: {
            name: 'h1',
            classes: 'h-chapter'
          },
          title: '챕터명',
          class: 'ck-heading_chapter ck-heading-custom',
        },
        {
          model: 'heading2',
          view: {
            name: 'h2',
            classes: 'h-title',
          },
          title: '소제목',
          class: 'ck-heading_title ck-heading-custom',
        },
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
  

  useEffect(() => {
    if (update) {

      const Tags = document.querySelectorAll('h1, h2');
      let tags = [];

      let temp_chapBtn = chapterBtn  // {}
      let temp_chapHeight = chapterHeight // {}


      for (let i = 0; i < Tags.length; i++) {
        if (Tags[i].id.length>0) {
          tags.push({
            type: Tags[i].localName,
            body: Tags[i].innerText,
            key: parseInt(Tags[i].id.substring(8,))
          })
        } else {
          Tags[i].id = `heading-${keyValue.current}`
          if(!temp_chapBtn[`h-${keyValue.current}`]) {
            temp_chapBtn[`h-${keyValue.current}`] = false;
          }
          temp_chapHeight[`h-${keyValue.current}`] = 0;
          tags.push({
            type: Tags[i].localName,
            body: Tags[i].innerText,
            key: keyValue.current
          })    
        }
        keyValue.current += 1;
      }

      setChapterBtn(temp_chapBtn);
      setChapterHeight(temp_chapHeight);


      try {
        const temp_chapters = [];

        if(tags.length > 0) {
          tags.map(tag => {        
            if (tag.type === 'h1' && tag.body!=='\n') {
              temp_chapters.push({ type: tag.type, body: `Ch.${tag.body}`, key: tag.key, type2:[]});
            }
            else if (tag.type === 'h2') {
              temp_chapters.length > 0 && temp_chapters[temp_chapters.length - 1].type2.push({type: tag.type, body: tag.body, key: tag.key})
            }
          })
          setChapter(temp_chapters);
        } else {
          setChapter([]);
        }
      } catch (err) {
        console.log(err)
        setChapter([]);
      } // 초기 tag 없을 때

      setUpdate(false);
    }
  }, [update])

  useEffect(() => {
    getNoteData();
  }, [inform]);

  return (
    <>
      <div className="m-note-container">
        <div className={!isOn ? "m-waiting-container" : "m-non-display"}>
          <Spin indicator={waitIcon} />
        </div>
        <div className={isOn ? "" : "m-non-display"}>
          <div className='m-editor-container'>
            <div id="m-editor-base">
              <div id="m-editor-create"></div>
            </div>
          </div>
        </div>
        <div 
          className="m-note-menubar"
          onClick={() => setChapterModal(true)}
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
        className="m-note--chapter-modal"
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
          {chapter
          && chapter.map((ch,idx) => (
            <div className="m-chapter-toolbar--heading1-area" key={idx}>
              <div className={((chapterBtn[`h-${ch.key}`] === true) ? `m-chapter-toolbar--on m-chapter-toolbar--up-arrow m-chapter-toolbar--on-${ch.key}` : '') 
              + " m-chapter-toolbar--arrow" + ` m-chapter-arrow--${ch.key}`} onClick={() => openChap2(ch)}></div>
              <div className="m-chapter-toolbar--heading1"><a href={`#heading-${ch.key}`}>{ch.body}</a></div>
              <div style={{"height": `${chapterHeight[`h-${ch.key}`]}px`}} className={"m-chapter-toolbar--heading2-area" + ` m-open-area--${ch.key}`}>
                <div className="m-chapter-toolbar--heading2-menu">
                {ch.type2 
                && ch.type2.map((ch2,idx) => (
                  <div className="m-chapter-toolbar--heading2" key={idx+'-2'}><a href={`#heading-${ch2.key}`}>{ch2.body}</a></div>
                ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}
export default Note;
