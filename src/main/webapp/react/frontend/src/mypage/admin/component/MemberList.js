import { useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import './MemberList.css';
import Pagination from "../../../components/notice/Pagination";

//jquery 추가
import $ from "jquery";

const MemberList = () => {

    const baseUrl = "http://localhost:8090";

    const [ memberList,setMemberList] = useState([]);
    const [ addressList,setAddressList] = useState([]);

    const [ classification , setClassification] = useState('');

    const [ limit, setLimit] = useState(10);    //한 페이지당 표시할 게시물 개수
    const [ page, setPage] = useState(1);
    const offset = (page - 1) * limit;


    useEffect(()=>{
        axios
        .get('/admin/listMembers')
        .then((response)=>{
            console.log(response.data);
            setMemberList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })

    },[]);

    const getAddress = async(user_id) => {    
        axios.get(baseUrl + '/member/listAddress' , {params:{user_id:user_id}})
            .then((response) => {
                setAddressList(response.data);
                })
            .catch((error)=> {
                console.log(error);
            })

        $(".j_modal").attr("style","display:block");
        $(".modal_content").css({
                "top": (($(window).height()-$(".modal_content").outerHeight())/2+$(window).scrollTop())+"px",
                "left": (($(window).width()-$(".modal_content").outerWidth())/2+$(window).scrollLeft())+"px"
                //팝업창을 가운데로 띄우기 위해 현재 화면의 가운데 값과 스크롤 값을 계산하여 팝업창 CSS 설정     
        });    

    }

    $("#btn_close_modal").on("click",function(){
        $(".j_modal").attr("style","display:none");
    });

    /* 회원 권한 수정 */

    const handleChangeSelect = (e) => {
        setClassification(e.target.value);
    }

    const handleClass = async(user_id) => {
        console.log(user_id);

        await axios
         .post(baseUrl + '/admin/handleClassification', {
             user_id:user_id , classification : classification
         })
         .then( (response)=> {
             alert('회원권한이 수정 되었습니다.');
             document.location.href='/admin'; 
         })
         .catch((error)=> {
             console.log(error);
         })
    }

    return (
        <div className="box table-section">
            <div className="box_header">
                <h2>회원 목록</h2>
            </div>
            <table class="tb" style={{cellspacing:"0",border:"1"}}>
                <colgroup>
                    <col width="90"/>
                    <col width="40"/>
                    <col width="90"/>
                    <col width="100"/>
                    <col width="90"/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">회원ID</th>
                        <th scope="col">이름</th>
                        <th scope="col">생일</th>
                        <th scope="col">주소</th>
                        <th scope="col">번호</th>
                        <th scope="col">권한</th>
                        <th scope="col">수정</th>
                    </tr>
                </thead>

                <tbody>
                    {memberList.length===0 ?
                    <tr height="10">
                        <td colSpan="7">
                            <p style={{align:"center"}}>
                                <b><span style={{fontSize:"9pt"}}>등록된 회원이 없습니다.</span></b>
                            </p></td>
                    </tr>
                    :
                    memberList.slice(offset, offset + limit).map((member,key) => {
                        return(
                            <tr>
                                <td id='id'>{member.user_id}</td>
                                <td id='name'>{member.user_name}</td>
                                <td id='birth'>{member.birth}</td>
                                <td id='addr_1'> <button onClick={() => getAddress(member.user_id)}>보기</button></td>
                                <td id='phone'>{member.phone}</td>
                                <td id='classification'>{member.classification}</td>
                                <td id='modify'>
                                <select onChange={handleChangeSelect}>
                                    <option selected >전체보기</option>
                                    <option value="1" >회원</option>
                                    <option value="2">전문가</option>
                                </select>
                                <button onClick={() => handleClass(member.user_id)}>수정</button></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <footer>
            <Pagination
                total={memberList.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />
            </footer>
            <div class = "j_modal">
                <div class= "modal_content">
                    <div class= "modal_title">
                        <h3 style={{color:"black",fontSize:25,margin:17}}>회원 주소</h3>
                        <img src='/img/close.png' id="btn_close_modal" style={{width:30,height:30,marginLeft:230}}/>
                    </div>
                </div>	
                <div class="modal_layer"></div>
            </div>
        </div>
    )
}

export default MemberList;