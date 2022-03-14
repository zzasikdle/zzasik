import './Edit.css';
import React, {useState} from 'react';
import { useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

/* 마이페이지 - 내 정보 수정 클릭 시 작동하는 함수 */
function Edit(){
    //로그인 연동 후 가져오기
   //const user_id = sessionStorage.getItem('user_id');
   
   const baseUrl = "http://localhost:8090";
   const user_id  = sessionStorage.getItem("user_id");
   
   const [user_name,setUserName] = useState('');
   const [phone,setPhone] = useState('');

//    useEffect(()=>{
//        axios 
//        .get('/myhome',{
//            params:{
//                user_id: user_id
//            }
//        })
//        .then((response)=>{
//            console.log(response.data);
//            setUserInfo(response.data);
//        })
//        .catch((error) => {
//            console.log(error);
//        })
//    },[]);

   const changeDisplay  = () => {
        // 수정 버튼 누르면 밑에 쫙 펼쳐지게 자바스크립트 구현
   }

   /* 회원 정보 수정 ( 이름 ) */

   const handleName = (e) => {
        setUserName(e.target.value);
   }

   function submitName(e) {

    const submitName = async() => {

        await axios
        .post(baseUrl + "/member/modMemberName",{user_id:user_id , user_name : user_name})
        .then( (response) => {
            sessionStorage.removeItem("user_name");
            sessionStorage.setItem("user_name" ,user_name ); // 세션에 새로운 값 저장.
            alert("이름이 변경 되었습니다.");
            setUserName('');
         })
         .catch((error) => {
            console.log(error);
        });
    }
    submitName();
    
   }

   /* 회원 정보 수정 ( 휴대전화 ) */

   const selectList = ["대한민국", "미국", "호주"];
   const [Selected, setSelected] = useState("+82");

   const handleSelect = (e) => {
    setSelected(e.target.value);
  };

   const handlePhone = (e) => {
    setPhone(e.target.value);
    }

    function submitPhone(e) {

        const submitPhone = async() => {
    
            await axios
            .post(baseUrl + "/member/modMemberPhone",{user_id:user_id , phone : phone})
            .then( (response) => {
                sessionStorage.removeItem("phone");
                sessionStorage.setItem("phone" ,phone ); // 세션에 새로운 값 저장.
                alert(response.data.message);
                setPhone('');
             })
             .catch((error) => {
                console.log(error);
            });
        }
        submitPhone();
        
       }
   

   //회원가입 폼 가져오기 
   return (
        <>
           <h1>마이페이지</h1>
           <div className='box profile-edit'>
               <div className='box_header'>
                <h2>내 정보 수정</h2>
               </div>
               
               <tr>
                   <th>
                       <div className="thcell"></div>
                        <span>사용자 이름 </span>
                   </th>
                   <td>
                       <div className="tdcell"><p class="contxt_tit" >{sessionStorage.getItem("user_name")}</p>
                            <p class="contxt_desc" >이름이나 생년월일, 성별 등의 정보가 변경되었다면 본인확인을 통해 정보를 수정할 수 있습니다.</p>   
                            <p><input type="text" id="user_name" maxlength="14" value={user_name} onChange={handleName}></input></p>
                            
                            
                            <p className="btn_area_btm">
                                <button class="btn2" onClick={submitName}>수정</button>
                            </p>
                        
                        </div>
                   </td>
               </tr>

               <tr>
                   <th>
                       <div className="thcell">휴대전화</div>
                        
                   </th>
                   <td>
                       <div className="tdcell"><p class="contxt_tit" id="phoneNO">{sessionStorage.getItem("phone")}</p>
                            <p className="contxt_desc">아이디, 비밀번호 찾기 등 본인확인이 필요한 경우 또는 유료 결제 등 짜식들로부터 알림을 받을 때 사용할 휴대전화입니다.</p>   
                            
                            <div id="d_phoneNo" style={{display:"block"}}>
                                <p class="contxt_tit2" ><label for="phoneNO">변경할 휴대전화</label></p>
                                <p className="contxt_webctrl">
                                    <select className="country_drop" onChange={handleSelect} value={Selected}>
                                        {selectList.map((item) => (
                                        <option value={item} key={item}>
                                        {item}
                                        </option>
                                    ))}
                                    </select>
                                <span className="country_code_w">
                                        <span className="country_code">{ 
                                          Selected === "대한민국" ? "+82" 
                                        : Selected === "미국" ? "+1" 
                                        : Selected === "호주" ? "+61" : "+82"}</span>
                                        <input  type="number" id="phoneNo" maxlength="14" value={phone} onChange={handlePhone}></input>
                                    </span>

                                    <button class="btn2" >변경</button>
                                </p>
                                
                                <p className="btn_area_btm">
                                    <button class="btn2" id="b_txt_phoneNo_cncl" onClick={changeDisplay} >수정취소</button>
                                    <button class="btn2" onClick={submitPhone} >수정완료</button>
                                </p>
                            </div>

                            <p id="p_phoneNo" style={{display:"none"}} ><button>수정</button></p>
                        </div>
                   </td>
               </tr>

               <tr>
                    <th>
                       <div className="thcell">배송지 관리</div>
                   </th>

                   <td>
                       <div className="tdcell">
                            <p className="contxt_desc">내가 저장한 배송지 및 최근 사용한 배송지를 관리할 수 있습니다.</p>   
                            <button class="btn2" ><Link to= '/myhome/myAddress' className="links">조회하기</Link></button>
                       </div>
                   </td>
               </tr>
           </div>
       </>
   );
}

export default Edit;