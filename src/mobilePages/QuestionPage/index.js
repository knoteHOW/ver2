import { useState, useEffect, useRef } from 'react';

import { Rate } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
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

const QuestionPage = () => {
  // 답변이 있는 경우
    // 내가 질문한 경우
      // 미채택 - case1 평점 창
      // 채택 - case2 채택완료
    // 내가 답변한 경우
      // 미채택 - case3 채택대기 중
      // 채택 - case2 채택완료
    // 둘다 아닌 경우
      // 미채택 - case4 채택관련 표시 x
      // 채택 - case4 채택관련 표시 x
  // 답변이 없는 경우
    // 내가 질문한 경우 - case5 답변 대기 중
    // 튜터인 경우 - case6 답변하기
    // 튜터가 아닌 경우 - case7 튜터가입하기

    const [rate, setRate] = useState(1);
    const [myRate, setMyRate] = useState(0);
    const [onRate, setOnRate] = useState(false);
    const [isEditor, setIsEditor] = useState(false);
    const answerContent = useRef('');
    const editorNum = useRef(0);

    const profile1 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470409022.png';
    const profile2 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470422428.png';
    const profile3 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470440475.png';
    const profile4 = 'https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1618470456681.png';

    const data = 
    {
      profile: profile1,
      nick: 'Ming',
      created: '1주전',
      content: `<p>이 문제 답을 알려주세요! 다음 코드의 결과는? (sizeof() 함수는 할당된 메모리의 크기를 계산해주는 내장함수이다. 단위는 byte이다.)<p/>`,
      isPass: true,
      like: 123,
      comment: 3,
      // answer: {
      //   profile: profile2,
      //   nick: "Jay",
      //   created: '어제',
      //   content: '<p>c는 char형 이므로 1byte, l은 long형이므로 4byte, i1은 int형이므로 4byte입니다. 따라서 size=1+4+4 =9가 대입되고, 이것을 printf로 출력하면 9가 출력될 것입니다. 제 답변은 여기까지입니다! 도움이 되었으면 좋겠네요ㅎㅎ 또 질문할게 있다면 해주세요 :)<p/>',
      //   comments: [
      //     {
      //       profile: profile3,
      //       nick: "Alphago",
      //       created: '어제',
      //       content: '<p>결정구조 및 회절에 대해 궁금한 것, 모르는 것, 헷갈리는 것들을 질문하고 답하세요! 결정구조 및 회절에 대해 궁금한 것, 모르는 것, 헷갈리는 것들을 질문하고 답하세요! 결정구조 및 회절에 대해 궁금한 것, 모르는 것, 헷갈리는 것들을 질문하고 답하세요! 결정구조 및 회절에 대해 궁금한 것, 모르는 것, 헷갈리는 것들을 질문하고 답하세요!<p/>',
      //     },
      //     {
      //       profile: profile4,
      //       nick: "Sione",
      //       created: '어제',
      //       content: '<p>오냐~<p/>',
      //     },
      //     {
      //       profile: profile1,
      //       nick: "Orora",
      //       created: '어제',
      //       content: '<p>서이추해요~<p/>',
      //     },
      //     {
      //       profile: profile2,
      //       nick: "Shoei",
      //       created: '어제',
      //       content: '<p>유익하네요!<p/>',
      //     },
      //   ]
      // },
    }
  

  const UserInform = ({data}) => {
    return (
      <>
        <div className="m-qp-user-inform">
          <div className="m-qp-profile-img">
            <img src={data && data.profile} alt="profile-img"/>
          </div>
          <div className="m-qp-profile-text">
            <p className="m-qp-user-nick">{data && data.nick}</p>
            <p className="m-qp-created-at">{data && data.created}</p>
          </div>
        </div>
        <div className="m-qp-content">
          <div id="m-editor-base">
            <div 
              className="ck-editor__main"
              dangerouslySetInnerHTML={{ __html: data && data.content }}
            ></div>
          </div>
        </div>
      </>
    )
  }

  const Answer = ({data, type}) => {
    return (
      <>
        <p className="m-qp-header">Answer</p>
        <div className="m-qp-question">
          <div className="m-qp-question-wrap">
            <UserInform data={data}/>
            { type === 'rate' ? (
              <MyRate />
            ): (
              type === 'select' ? (
                <Select />
              ): type === 'waiting' ? (
                <Waiting />
              ) :
              (
                <div className="margin-box"></div>
              )
            )}
          </div>
          <div className="m-qp-comment-wrap">
            {data && data.comments && data.comments.map(comment => (
              <div className="m-qp-comment">
                <UserInform data={comment}/>
              </div>
            ))}
            <div className="m-qp-comment-btn">
              <input type="text"/>
              <div className="btn">댓글 달기</div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const MyRate = () => {
    return (
      <div className="m-qp-rate-box">
        <div className="rate-btn">
          <Rate onChange={changeRate} value={myRate} style={{ color: "#EF0050", fontSize: "20px"}}/>
        </div>
        <div 
          className="select-btn" 
          onClick={()=> {
            setOnRate(true)
          }}
        >
          {onRate ? (
            <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621245647240.png" alt="check"/>
          ):(
            <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621245480527.png" alt="non-check"/>
          )}
          채택하기
        </div>
      </div>
    )
  }

  const Select = () => {
    return (
      <div className="m-qp-select-box">
        <Rate disabled value={rate} style={{ color: "#EF0050", fontSize: "15px"}}/>
        <div className="m-qp-select-mark">
          <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621245647240.png" alt="check"/>
          채택완료
        </div>
      </div>
    )
  }

  const Waiting = () => {
    return (
      <div className="m-qp-waiting-box">
        <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621252628417.png" alt="waiting"/>
        <div className="m-qp-waiting-text">채택대기중</div>
      </div>
    )
  }

  const editorConfiguration = {
    plugins: [ 
      Essentials, 
      Bold, 
      Paragraph, 
      // Code, 
      // Alignment,
      // AutoImage, 
      // Autoformat,
      // Autosave,
      // BlockQuote,
      // CodeBlock,
      // Plain,
      SimpleUploadAdapter,
      // Heading,
      // HorizontalLine,
      Image,
      // ImageCaption,
      ImageToolbar,
      ImageUpload,
      ImageInsert,
      ImageResizeEditing, 
      ImageResizeButtons,
      // Indent,
      // Linked,
      // List,
      // MathType,
      // Table,
      // TableCellProperties,
      // TableToolbar,
      TextTransformation,
    ],
    toolbar: {
      items: [ 'bold', 'imageUpload' ],
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

  const onEditor = () => {
    setIsEditor(true);
  }
  
  const changeRate = value => {
    setMyRate(value);
  };

  useEffect(() => {
    isEditor && editorNum.current === 0 && ClassicEditor
    .create( document.querySelector( '#m-editor-create' ), editorConfiguration )
    .then( editor => {
      editorNum.current = 1
      editor.model.document.on( 'change', () => {
        answerContent.current = editor.getData();
      });
    })
    .catch( error => {
        console.error( error.stack );
    } );
  }, [isEditor])

  const isMyQuestion = false;
  const select = false;
  const isMyAnswer = false;
  const isTutor = true;

  
  return (
    <>
      <div className="m-qp-wrap">
        <p className="m-qp-header">Question</p>
        <div className="m-qp-question">
          <div className="m-qp-question-wrap">
            <UserInform data={data}/>
            <div className="m-qp-footer">
              <div className="like">
                <LikeOutlined className="like-icon" />
                <p>{data && data.like}</p>
              </div>
              <div className="comment">
                <img src="https://knotehow-image.s3.ap-northeast-2.amazonaws.com/1621231773808.png" alt="comment"/>
                <p>{data && data.comment}</p>
              </div>
            </div>
          </div>
        </div>
        {
          data && data.answer ? (
            isMyQuestion ? (
              !select ? ( // case1
                <>
                  <Answer data={data.answer} type='rate'/>
                </>
              ):
              ( // case2
                <>
                  <Answer data={data.answer} type='select'/>
                </>
              )
            ): 
            (
              isMyAnswer ? (
                !select ? ( // case3
                  <>
                    <Answer data={data.answer} type='waiting'/>
                  </>
                ):
                ( // case2
                  <>
                    <Answer data={data.answer} type='select'/>
                  </>
                )
              ):
            ( // case4
              <>
                <Answer data={data.answer} />
              </>
            )
            )
          ): 
          (
            isMyQuestion ? ( // case5
              <>
                <p className="m-qp-header">Answer</p>
                <div className="m-qp-none-a-wrap">
                  <p>아직 답변을 기다리는 중입니다!</p>
                  <p>조금만 기다려주세요 :)</p>
                </div>
              </>
            ):
              isTutor ? ( // case6
                <>
                  <p className="m-qp-header">Answer</p>
                  {
                    !isEditor ?
                    (
                      <div className="m-qp-none-a-wrap">
                        <div 
                          onClick={onEditor}
                          className="m-qp-a-btn"
                        >답변하기</div>
                      </div>
                    ):
                    (
                      <div className="m-qp-none-a-wrap">
                        <div id="m-editor-create">
                          <div id="m-editor-base"></div>
                        </div>
                        <div 
                          className="m-qp-a-btn"
                        >답변하기</div>
                      </div>
                    )
                  }
                </>
              ):
              ( // case7
                <>
                  <p className="m-qp-header">Answer</p>
                  <div className="m-qp-none-a-wrap">
                    <p>아직 튜터가 아닌가요?</p>
                    <p className="m-qp-tutor">튜터가 되면 답변을 할 수 있습니다!</p>
                    <a href="https://tutor.knotehow.com" rel="noopener noreferrer" target="_blank">
                      <div className="m-qp-a-btn">튜터 지원하기</div>
                    </a>
                  </div>
                </>
              )
          )
        }
      </div>
    </>
  )
}

export default QuestionPage;