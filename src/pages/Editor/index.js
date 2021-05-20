import { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Progress, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import axios from 'axios';

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

const Editor = () => {
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
    // autosave: {
    //   save( editor ) {
    //       return autoSaveData( editor.getData() );
    //   }
    // },
    math: {
      engine: 'katex', // or katex or function. E.g. (equation, element, display) => { ... }
      outputType: 'script', // or span
      forceOutputType: false, // forces output to use outputType
      enablePreview: false, // Enable preview view
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
    ClassicEditor
    .create( document.querySelector( '#test-editor' ), editorConfiguration )
    .then( editor => {
      // const content = document.querySelector('.ck-content');
      // if(result2.data.NotePage.status !== 0) {
      //   editor.isReadOnly = true
      // }
      // onAppend(content, function() {
      //   setUpdate(true);
      // })
      // myEditor.current = editor
      // editorNum.current = 1
      // editor.setData(result2.data.NotePage.notes[0].content);
      // setIsOn(true);
      // editor.model.document.on( 'change:data', () => {
      //   selectDisable(editor);
      //   // makeChapter();
      //   setTimeout(() => {
      //     calLength();
      //     // changeHeight();
      //   }, 100);
      // });
    })
    .catch( error => {
        console.error( error.stack );
    } );
  }, [])

  return (
    <>
      <div id="test-editor" style={{marginTop: "80px"}}>

      </div>
    </>
  )
}

export default Editor;