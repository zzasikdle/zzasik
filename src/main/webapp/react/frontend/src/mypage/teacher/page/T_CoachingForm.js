//코칭 하기 버튼 클릭시 나타남(전문가)
import {useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './T_CoachingForm.css';
import { Link  } from "react-router-dom";



import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
export default function T_CoachingForm(){



  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [inputValue, setInputValue] = useState("");

  const onEditorStateChange = (editorState) => {
   
    setEditorState(editorState);
  };

  
  const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    
const baseUrl = "http://localhost:8090";
const { board_code } = useParams();
const { user_id } = useParams();
const [userdetail, setUserdetail] = useState('');
const [board, setBoard] = useState({});

const [coaching_num, setcoaching_num] = useState({});
const [breakfast, setbreakfast] = useState({});
const [Lunch, setLunch] = useState({});
const [dinner, setdinner] = useState({});
const [snack_1, setsnack_1] = useState({});
const [snack_2, setsnack_2] = useState({});
const [calorie, setcalorie] = useState({});
const [coaching_answer, setcoaching_answer] = useState({});



useEffect(() => {
    async function call() {
        await axios
            .get(baseUrl + '/board/userdetail', { params: { user_id: user_id } })
            .then((response) => {
                console.log(response.data)
              
                setUserdetail(response.data[0]);
                console.log(userdetail)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    

    call();


}, []);


useEffect(() => {


    async function call() {
        await axios
            .get(baseUrl + '/board/viewBoard', { params: { board_code: board_code } })
            .then((response) => {
                setBoard(response.data);
               


            })
            .catch((error) => {
                console.log(error);
            })
    }

    call();

}, []);


function endDate(){

    
   var date= userdetail.start_date;
   return date;
}

//글쓰기 버튼 
const writeBtn = async()=>{
    const formData = new FormData();
    formData.append("coaching_num",coaching_num);
    formData.append("breakfast",breakfast);
    formData.append("Lunch",Lunch);
    formData.append("dinner", dinner);
    formData.append("snack_1",snack_1);
    formData.append("snack_2", snack_2);
    formData.append("calorie", calorie);
    formData.append("coaching_answer",editorToHtml);
    formData.append("user_id", user_id);
    formData.append("board_code", board_code);

  


    await axios
    .post(baseUrl+"/board/coachingAnswer", formData,{
        headers: { "Content-Type": "multipart/form-data; boundary=${formData._boundary" }

    }
   
    ).then((response)=>{
        alert({coaching_num}+"일차 입력완료")
        
          
      
    })
    
    .catch((error)=>{
        alert(error);
        
    })

}



    return (
        <>
        
        <h1 className="myhome-title">코칭 하기</h1>
        <div className='content'>
        <div>{endDate()}</div>
            <div style={{display:"flex",flexDirection:"row"}}>
            <div className='box smallbox'>
                <div className='box_header'>
                    <h2>회원 정보</h2>
                  
                </div>
                <div>id:{user_id}</div>
                <div>이름:{userdetail.user_name}</div>
                <div>핸드폰번호:{userdetail.phone}</div>
                <div>이메일:{userdetail.email}</div>
                <div>생일:{userdetail.birth}</div>
                <div>시작날짜:{userdetail.start_date}</div>
                <div>총날짜 {board.board_period}</div>
            
            </div>
            <div className='box smallbox'>
                <div className='box_header'>
                    <h2>회원 수행 메시지</h2>
                </div>
                
            </div>
            </div>
            <div className='box coachform'>
                <div class="coaching_div_1" className='box_header'>
                    <h2>코칭 글 작성</h2>
                    
                  
                    
                </div>

                <p class="mid_msg">일차<input type="text"  onChange={(e) => {setcoaching_num (e.target.value)}}/></p>
                    <p class="mid_msg">아침<input type="text"  onChange={(e) => {setbreakfast(e.target.value)}}/></p>
                    <p class="mid_msg">점심<input type="text"  onChange={(e) => {setLunch(e.target.value)}}/></p>
                    <p class="mid_msg">저녁<input type="text"  onChange={(e) => {setdinner(e.target.value)}}/></p>
                    <p class="mid_msg">간식<input type="text"  onChange={(e) => {setsnack_1(e.target.value)}}/></p>
                    <p class="mid_msg">간식<input type="text"  onChange={(e) => {setsnack_2(e.target.value)}}/></p>
                    <p class="mid_msg">총 칼로리<input type="text"  onChange={(e) => {setcalorie(e.target.value)}}/></p>
                
            </div>


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

        <Link to="/"  onClick={writeBtn}><button class="click">글쓰기</button></Link>
    </>
    );

}