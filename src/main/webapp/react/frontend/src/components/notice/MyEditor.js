import React, { useState} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// convertToRaw: editorState 객체가 주어지면 원시 JS 구조로 변환.
import { EditorState, convertToRaw} from 'draft-js';

// convertToRaw로 변환시켜준 원시 JS 구조를 HTML로 변환.
import draftToHtml from 'draftjs-to-html';

import './NoticePage.css';

/*공지사항 글쓰기 */
const MyEditor = () => {

  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [inputValue, setInputValue] = useState("");

  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  // editorState의 현재 contentState 값을 원시 JS 구조로 변환시킨뒤, HTML 태그로 변환시켜준다.
  const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  // 작성하기 클릭 시 작동
  const checkReg = () => {
    if(window.confirm( "공지사항을 등록하시겠습니까?" )){
      if(inputValue===""){
        alert("제목을 입력해주세요.");
        return false;
      }else if(convertToRaw(editorState.getCurrentContent())===""){
        alert("내용을 입력해주세요.");
        return false;
      }else{
        //글 서버로 보내기
        axios 
        .get('/notice/new',{
            params:{
              title : inputValue,
              editorToHtml: editorToHtml
            }
        })
        .then(()=>{
          alert("공지사항이 등록되었습니다.");
          window.location.href="/notice";
        })
        .catch((error) => {
            console.log(error);
        })
      }

    }
    else return false;
    
  };

  //취소 버튼 클릭 시 작동
  const checkCencel = () => {
    if(window.confirm( "작성을 취소하시겠습니까?" )) window.location.href="/notice";
    else return false;
  };


  return (
    <div className="notice-container">
      <div className='title-box'>짜식 공지사항</div>
        <div className='content'>
        <input className='input-title' onChange={(event) => setInputValue(event.target.value)} placeholder="제목을 작성해주세요."/>

          <Editor
            // 에디터와 툴바 모두에 적용되는 클래스
            wrapperClassName="wrapper-class"
            // 에디터 주변에 적용된 클래스
            editorClassName="editor"
            // 툴바 주위에 적용된 클래스
            toolbarClassName="toolbar-class"
            // 툴바 설정
            toolbar={{
              // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: false },
            }} 
            placeholder="내용을 작성해주세요."
            // 한국어 설정
            localization={{
              locale: 'ko',
            }}
            // 초기값 설정
            editorState={editorState}
            // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
            onEditorStateChange={onEditorStateChange}
          />
          <button onClick={checkReg}>작성하기</button>
          <button onClick={checkCencel} >취소</button>
        </div>
      </div>
  );
};

export default MyEditor;