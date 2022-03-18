import React, {useState,useEffect} from 'react';
import axios from 'axios';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState} from 'draft-js';
//import draftToHtml from 'draftjs-to-html';

//jquery 추가
import $ from "jquery";

export default function MyLesson(){
    const percentage = 66;
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [userBoardList, setUserBoardList] = useState([]); //유저가 신청한 코칭 서비스 리스트
    const [currentBoard,setCurrentBoard] = useState([]); //현재 선택된 코칭 서비스(BoardVO)
    const [mealList,setMealList] = useState([]); //식단 리스트
    const [dayCount,setDayCount] = useState(0); //몇일차 인지 저장하는 변수 
    //const [startdate,setStartDate] = useState("2022-03-14"); //코칭 서비스 시작 날짜
    const startdate="2022-03-14";
    const user_id = sessionStorage.getItem('user_id');

    /* 유저가 신청한 서비스 모두 가져오기 */
    useEffect(() => {  
      axios
        .get("/board/userBoardList", { params: { user_id: sessionStorage.getItem('user_id') } })
        .then((response) => {
            setUserBoardList(response.data); 
            setCurrentBoard(response.data[0]);
       //     getStartDate(response.data[0].board_code);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    /* 에디터 */
    const onEditorStateChange = (editorState) => {
      // editorState에 값 설정
      setEditorState(editorState);
    };
  
    const openSendModal = async() => {    
        $(".j_modal").attr("style","display:block");
        $(".send_content").css({
                "top": (($(window).height()-$(".send_content").outerHeight())/2+$(window).scrollTop())+"px",
                "left": (($(window).width()-$(".send_content").outerWidth())/2+$(window).scrollLeft())+"px"
                //팝업창을 가운데로 띄우기 위해 현재 화면의 가운데 값과 스크롤 값을 계산하여 팝업창 CSS 설정     
        });    

    }

    $("#btn_close_modal").on("click",function(){
        $(".j_modal").attr("style","display:none");
    });

     //코칭 서비스 선택 시, 표시되는 내용 바뀜
     const onChangeOption = () => {
        setDayCount(dateDiff(startdate,new Date()));
        var optVal = $(".userboard-select option:selected").val();
        if(optVal==="default"){
            $(".content").attr("style","display:none");
            return false;
        }
        
        $(".content").attr("style","display:block");
        getMealInfo(optVal);

        axios
        .get("/board/viewBoard", { params: { board_code: optVal } })
        .then((response) => {
            setCurrentBoard(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    //코칭 서비스 시작 날짜 가져오기
    /*const getStartDate = (board_code) => {
        axios
        .get("/board/startdate", {
             params: {
                user_id : user_id,
                board_code: board_code,
                } 
        })
        .then((response) => {
            setStartDate(response.data);
            setDayCount(dateDiff(response.date,new Date()));
        })
        .catch((error) => {
            console.log(error);
        })
    }*/

    //몇일차인지 계산하는 함수
    function dateDiff(_date1, _date2) {
        console.log(_date1+" "+_date2);
        var diffDate_1 = _date1 instanceof Date ? _date1 :new Date(_date1);
        var diffDate_2 = _date2 instanceof Date ? _date2 :new Date(_date2);
     
        diffDate_1 =new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
        diffDate_2 =new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
     
        var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
        diff = Math.ceil(diff / (1000 * 3600 * 24));
     
        return diff + 1;
    }

    //coachingtbl에 등록된 식단 가져오기 
    const getMealInfo = (board_code) => {
        axios
        .get("/board/mealinfo", {
             params: {
                user_id : user_id,
                board_code: board_code,
                coaching_num: dayCount
            } 
        })
        .then((response) => {
            setMealList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // 보내기 클릭 시 작동
    const onClickSend = () => {
        if(window.confirm( "코치에게 작성한 메시지를 보내시겠습니까?" )){
            //글 서버로 보내기
        /* axios 
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
            })*/
        }
        else return false;
  };

    //취소 버튼 클릭 시 작동
    const onClickCancel = () => {
        setEditorState("");
        $(".j_modal").attr("style","display:none");
    };


    return (
        <>
            <h1 className="myhome-title">나의 코칭 서비스
            <select class="userboard-select" onChange={onChangeOption}>
                <option value="default">코칭서비스를 선택해주세요.</option>
                {userBoardList.map((board,key) => {
                        return(
                            <option value={board.board_code}>[{board.board_code}]{board.board_title}</option>
                        )
                    })}
            </select>
            </h1>
            {currentBoard.length !== 0 ? 
            <>
            <div className='content' style={{display:"none"}}>
                <div style={{display:"flex",flexDirection:"row"}}>
                    <div className='box smallbox'>
                        <div className='box_header'>
                            <h2>내가 수강중인 서비스</h2>
                        </div>
                        <div className="meal-table">
                        <tr>
                        <th><div className="thcell">서비스명</div></th>
                        <td><div className="tdcell"><p className="contxt_desc">{currentBoard.board_title}{mealList.length}</p></div></td>
                        </tr>
                        <tr>
                        <th><div className="thcell">기간</div></th>
                        <td><div className="tdcell"><p className="contxt_desc">{startdate}~ +{currentBoard.board_period}</p></div></td>
                        </tr>
                        <tr>
                        <th><div className="thcell">진행률</div></th>
                        <td><div className="tdcell" style={{width:140,height:140}}><CircularProgressbar value={percentage} text={`${percentage}%`} /></div></td>
                        </tr> 
                        </div>
                    </div>
                    <div className='box smallbox'>
                        <div className='box_header'>
                            <h2>진행된 식단</h2>
                        </div>
                        <div className="buttonlist">
                            <ul>{mealList.map((meal,key)=>{
                                return(
                                <li class="item"><button className="dayBtn">{key+1}일차</button></li>
                                )
                            })} 
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="box table-section" style={{width:870,margin:"50px auto"}}>
                    <div className='box_header'>
                            <h2 style={{display:"flex",flexDirection:"row"}}>오늘의 식단<p className="day">{dayCount}일차</p></h2>
                    </div>
                    <div className="meal-table">
                    <tr>
                        <th><div className="thcell">아침</div></th>
                        <td><div className="tdcell"><p class="contxt_tit" >바나나2개, 그릭요거트200g </p></div></td>
                    </tr>
                    <tr>
                        <th><div className="thcell">점심</div></th>
                        <td><div className="tdcell"><p class="contxt_tit" >일반식</p></div></td>
                    </tr>
                    <tr>
                        <th><div className="thcell">저녁</div></th>
                        <td><div className="tdcell"><p class="contxt_tit" >고구마</p></div></td>
                    </tr>
                    <tr>
                        <th><div className="thcell">간식</div></th>
                        <td><div className="tdcell"><p class="contxt_tit" >닭가슴살</p></div></td>
                    </tr>
                    <tr>
                        <th><div className="thcell">총칼로리</div></th>
                        <td><div className="tdcell"><p class="contxt_tit" >1303kcal</p></div></td>
                    </tr>
                    <tr>
                        <th><div className="thcell">코멘트</div></th>
                        <td><div className="tdcell"><p class="contxt_tit" >어쩌고 저쩌고</p></div></td>
                    </tr>
                </div>
                <div className="button-area">
                        <button className="setting_btn green_bg" onClick={openSendModal} style={{float:"right"}}>코치에게 메시지 보내기</button>
                    </div>
                </div>
            </div>
            <div class = "j_modal">
                <div class= "send_content">
                    <div class= "modal_title">
                        <h3 style={{color:"black",fontSize:25,margin:17}}>메시지 보내기</h3>
                    </div>
                    <div style={{margin:50}}>
                    <Editor
                    // 에디터와 툴바 모두에 적용되는 클래스
                    wrapperClassName="wrapper-class"
                    // 에디터 주변에 적용된 클래스
                    editorClassName="send-editor"
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
                <button className="noticeBtn" onClick={onClickSend}>보내기</button>
                <button className="noticeBtn" onClick={onClickCancel} >취소</button>
                    </div>
                </div>	
                <div class="modal_layer"></div>
            </div>
            </>
            :false}

        </>
    );
}