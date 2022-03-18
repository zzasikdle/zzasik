
//no-unused-vars 경고 해결 완료
/*eslint-disable*/

import { baseUrl } from '../../../config';
import './Edit.css';
import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  

/* 마이페이지 - 내 정보 수정 클릭 시 작동하는 함수 */
function Edit(){
    //로그인 연동 후 가져오기
   //const user_id = sessionStorage.getItem('user_id');
   
   
   const user_id  = sessionStorage.getItem("user_id");
   
   const [user_name,setUserName] = useState('');
   const [phone,setPhone] = useState('');


   /* 휴대전화 */
   const [ codeNo , setCodeNo] = useState('');
   const [ secondPhone , setSecondphone] = useState('');
   const [ thirdPhone , setThirdphone] = useState('');
   

    
    const handleCodeNo = (e) => {
        setCodeNo(e.target.value); // 지역번호 저장.
    }

    const handleSecondPhone = (e) => {
        setSecondphone(e.target.value);
    }

    const handleThirdPhone = (e) => {
        setThirdphone(e.target.value);
    }



   /* 회원 정보 수정 ( 이름 ) */

   function submitName(e) {

    const submitName = async() => {

        await axios
        .post(baseUrl + "/member/modMemberName",{user_id:user_id , user_name : e})
        .then( (response) => {
            sessionStorage.removeItem("user_name");
            sessionStorage.setItem("user_name" ,e ); // 세션에 새로운 값 저장.
            alert("이름이 변경 되었습니다.");
            setUserName('');
            document.location.href='/myhome/edit';
         })
         .catch((error) => {
            console.log(error);
        });
    }
    submitName();
    
   }

    function submitPhone(e) {

        if(codeNo === ""){
            alert("입력란을 모두 작성 해주세요.")
            return null;
        }
        const addr_phone = codeNo + secondPhone + thirdPhone ; 

        const submitPhone = async() => {
    
            await axios
            .post(baseUrl + "/member/modMemberPhone",{user_id:user_id , phone : addr_phone})
            .then( (response) => {
                sessionStorage.removeItem("phone");
                sessionStorage.setItem("phone" ,addr_phone ); // 세션에 새로운 값 저장.
                alert(response.data.message);
                setPhone('');
                document.location.href='/myhome/edit';
             })
             .catch((error) => {
                console.log(error);
            });
        }
        submitPhone();
        
       }
   

    /* 창 보이기 / 안 보이기 */
    const [ showing , setShowing] = useState(false);

    const NameModify = () => {
        return (
            <div>
                <p className="btn_area_btm">
                    <div>
                        <p><input id="user_name" type="text" maxlength="14" /></p>
                        <button class="btn_model" onClick={ () => submitName(document.getElementById("user_name").value)}>수정완료</button>
                        <button class="btn_model" onClick={onClickName}>수정취소</button>
                    </div>
                </p>
            </div>
        )
    }
    const onClickName = () => {
        setShowing ((prev) => !prev );
    }
   //회원가입 폼 가져오기 
   return (
        <>
           <h1 className='myhome-title'>마이페이지</h1>
           <div className='box profile-edit'>
               <div className='box_header'>
                <h2>내 정보 수정</h2>
               </div>
               
               <tr>
                   <th>
                       <div className="thcell">사용자 이름</div>
                        
                   </th>
                   <td>
                       <div className="tdcell"><p class="contxt_tit" >{sessionStorage.getItem("user_name")}</p>
                            <p class="contxt_desc" >이름이 변경되었다면 정보를 수정할 수 있습니다.</p>   
                            
                            <button className="btn_model init" onClick={onClickName}>수정하기</button>
                            {showing ? <NameModify /> : null}
                        
                        </div>
                   </td>
               </tr>

               <tr>
                   <th>
                       <div className="thcell">휴대전화</div>
                   </th>
                   <td>
                       <div className="tdcell"><p class="contxt_tit" id="phoneNO">{sessionStorage.getItem("phone")}</p>
                            <p className="contxt_desc">유료 결제 등 짜식들로부터 알림을 받을 때 또는 본인확인이 필요한 경우 또는 사용할 휴대전화입니다.</p>   
                            <div id="d_phoneNo" style={{display:"block"}}>
                <tr>
                    <td className="cell_title">
                    <p className="contxt_desc">연락처</p>
                    </td>                
    
                    <td>
                        <span className="_tel1box setting_selectbox" style={{width:"68px"}}>
                            <select className="select"onChange={handleCodeNo}>
                                <option selected >선택</option>
                                <option value="010" >010</option>
                                <option value="011">011</option>
                                <option value="012" >012</option>
                                <option value="013">013</option>
                                <option value="02" >02</option>
                                <option value="031">031</option>
                                <option value="032">032</option>
                                <option value="041" >041</option>
                                <option value="042">042</option>
                            </select>
                        </span>
                            <span className="hyphen">  -  </span>
                            <span className="_editable_input" style={{width: "48px"}}>
                                <label for="telNo1Second" className="lb_text blind">연락처 두번째자리 입력</label>
                                <input type="text" id="telNo1Second" className="ip_text" maxlength="4" onChange={handleSecondPhone}></input>
                            </span>
                                <span className="hyphen">  -  </span>
                            <span className="_editable_input" style={{width: "48px"}}>
                                <label for="telNo1Third" className="lb_text blind" >연락처 세번째자리 입력</label>
                                <input type="text" id="telNo1Third"  className="ip_text" maxlength="4"  onChange={handleThirdPhone} ></input>
                            </span>
                    </td>
            </tr>
    
                    <p className="btn_area_btm">
                        {/* <button class="btn2" id="b_txt_phoneNo_cncl" onClick={changeDisplay} >수정취소</button> */}
                        <p id="p_phoneNo"><button className="btn_model phone" onClick={submitPhone}>수정완료</button></p>
                    </p>
                </div>               
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
                            <button className="btn_model" ><Link to= '/myhome/myAddress' className="links">조회하기</Link></button>
                       </div>
                   </td>
               </tr>
           </div>
       </>
   );
}

export default Edit;