import { Link  } from "react-router-dom";
import axios from "axios";
import React  from 'react';
import { useEffect, useState } from "react";

 import './ModifyBoard.css';
import {useParams } from "react-router";


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';



  




const ModifyBoard = ( ) => {
      // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  // editorState의 현재 contentState 값을 원시 JS 구조로 변환시킨뒤, HTML 태그로 변환시켜준다.
  const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));


    
    
     const baseUrl = "http://localhost:8090";
     const [board_content , setBoard_cotent]= useState('');
     const [board_title, setBoard_title] = useState('');
     const [meal_type, setMeal_type] = useState('');
     const [board_price , setBoard_price]= useState('');
     const [imageFilename , setImageFilename]= useState('');
     const [board, setBoard] = useState({});
     const { board_code } = useParams();

 

     useEffect(() => {

        async function call() {
            await axios
                .get(baseUrl + '/board/viewBoard', { params: { board_code: board_code } })
                .then((response) => {
                    setBoard(response.data);
                    console.log(board);
                   


                })
                .catch((error) => {
                    console.log(error);
                })
        }

        call();

    }, []);

     const readURL = (e) => {
      
        if(e.target.files && e.target.files[0]){
            let reader = new FileReader();
            reader.onloadend = function(){
             document.getElementById("preview").setAttribute('src', reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
            setImageFilename(e.target.files[0]);
        }

     
    }

   

    const modifyBtn = async()=>{
        console.log(JSON.stringify(board_content));
     
        const formData = new FormData();
        formData.append("user_id",sessionStorage.getItem('user_id'));
        formData.append("teacher_name",sessionStorage.getItem('user_name'));
        formData.append("board_content",editorToHtml);
        formData.append("board_title",board_title);
        formData.append("meal_type",meal_type);
        formData.append("board_price",board_price);
        formData.append("imageFilename", imageFilename);
        formData.append("board_code", board_code);
    
       

        console.log(Object.values(board_content))
     
        await axios
        .post(baseUrl+"/board/modifyBoard", formData,{headers: { "Content-Type": "multipart/form-data; boundary=${formData._boundary" }})
        .then((response)=>{
            
            alert(response.data.message);
            
       
              
          
        })
        
        .catch((error)=>{
            alert(error);
      
            
        });

    }
    return (
        <div class="fir_div">
        <div id="write_form">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           
            <div class="text_div">
            <p class="head_msg">짜식 상품 등록👍🏻</p>
            <hr ></hr>
         <div class="proimage_text">상품이미지</div>
         
            <p id="proimage">
            <img  id="preview" />
            
                </p>
 
            <a class="temp"><br/><br/>*상품이미지는 640x640에 최적화 되어 있습니다.<br/><br/>-이미지는 상품등록 시 정사각형으로 짤려서 등록됩니다.<br/><br/>-큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다. 
            <br/><br/>최대 지원 사이즈인 640x640 으로 리사이즈 해서 올려주세요. </a>
            <p class="choicefile"><input type="file" class="inputfile" name="imageFilename"  onChange={readURL} /></p>
            <hr></hr>
            <p class="mid_msg">상품 제목<input type="text" id="title"  defaultValue={board.board_title}  placeholder="제목"  name= "board_title" onChange={(e) => {setBoard_title(e.target.value)}}/></p>
            <p class="mid_msg">상품 타입<input type="text" class="type" defaultValue={board.meal_type}  placeholder="타입" name="meal_type"  onChange={(e) => {setMeal_type(e.target.value)}}/></p> 
            
            <p class="mid_msg">상품 가격<input type="text" class="price" defaultValue={board.board_price}  placeholder="가격"  name="board_price" onChange={(e) => {setBoard_price(e.target.value)}}/></p>
            </div>

            
            
          
                <div class="product" >상품소개</div>
                 <div id="text_editor"> 
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
                </div>


           
                <Link to="/" onClick={modifyBtn}><button class="click">수정하기</button></Link>

<p><input type="hidden" class="board_content" placeholder="내용"  name="board_content"  defaultValue={board.board_content}  onChange={(e) => {setBoard_cotent(e.target.value)}}/></p>
<p><input type="hidden" placeholder="강사이름"value={sessionStorage.getItem('user_name')} name="teacher_name" /></p>
<p><input type="hidden" placeholder={sessionStorage.getItem('user_id')}  value={sessionStorage.getItem('user_id')} name="user_id"/></p>
        </div>
        </div>
    ); 
}; 

export default ModifyBoard;  