/*eslint-disable*/

import { baseUrl } from '../../config';
import './Join.css';
import axios from "axios";
import { useState , useRef, useCallback } from "react";
import DaumPostcode from "react-daum-postcode";

//jquery 추가
import $ from "jquery";

const Join = (props) => {


    const [user_id, setId] = useState(''); 
    const [user_pwd, setPwd] = useState('');
    const [user_name, setName] = useState('');
    const [addr_3, setAddr3] = useState('');
    const [birth, setBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState(''); 
    const [classification, setClassification] = useState('1'); 
    const [survey_code, setSurveyCode] = useState('');
    
    const check = document.getElementById("check");
    const pwdCorrect = document.getElementById("pwdCorrect");

    // 오류메시지 상태저장
    const [nameMessage, setNameMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
    const [isUserAddress ,setUserAddress] = useState(false);


    //https://wonyoung2257.tistory.com/4  참고하여 간략하게 바꾸기.

    const handleId = (e) => {
        setId(e.target.value);
        check.innerHTML="";
    }


    const handlePwd = useCallback ( (e) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value;
        setPwd(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
            setIsPassword(false);
          } else {
            setPasswordMessage('안전한 비밀번호에요🥰');
            setIsPassword(true);
          }
    }, [] ) ;

    const handleName = useCallback ( (e) => {
        setName(e.target.value);
        if(e.target.value.length < 2 || e.target.value.length > 5){
            setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
            setIsName(false);
        }else{
            setNameMessage('올바른 이름 형식입니다 :)');
            setIsName(true);
        }
    } , [] );

    const handleBirth = (e) => {
        setBirth(e.target.value);
    }
    const handlePhone = (e) => {
        setPhone(e.target.value);
    }
    const handleAddr3 = (e) => {
        setAddr3(e.target.value);
    }
    const handleEmail= useCallback ( (e) => {
        
        const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value;
        setEmail(emailCurrent);
        if(!emailRegex.test(emailCurrent)){
            setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요😫');
            setIsEmail(false);
        }else{
            setEmailMessage('올바른 이메일 형식이에요🥰');
            setIsEmail(true);
        }
    }, [] );

    const handleSurveyCode = (e) => {
        setSurveyCode(e.target.value);
    }

    /* 주소 검색 api */

    const addRef = useRef(); //주소
    const zoneRef = useRef(); //우편번호

    const [isAddress, setIsAddress] = useState("");
    const [isZoneCode, setIsZoneCode] = useState();

    const [isOpenPost, setIsOpenPost] = useState(false);

    const onChangeOpenPost = () => {
        setIsOpenPost(!isOpenPost);
      };

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setIsZoneCode(data.zonecode); // 우편번호 삽입.
    setIsAddress(fullAddress); // 전체 주소.
    setUserAddress(true); // 주소 입력 완료.
    setIsOpenPost(false); // 주소 클릭 시팝업 창 자동 닫힘. 

    $(".j_modal").attr("style","display:none"); //모달창 닫힘.
  };

  const postCodeStyle = {
    display: "block",
    margin: "auto",
    width: "400px",
    height: "500px",
    padding: "7px",
  };

   //우편번호찾기 모달창
    $(function(){ 
        //우편번호찾기 버튼 클릭시, 모달창 띄움
        $("#postCodeBtn").on("click",function(){
            $(".j_modal").attr("style","display:block");
            $(".modal_content").css({
                 "top": (($(window).height()-$(".modal_content").outerHeight())/2+$(window).scrollTop())+"px",
                 "left": (($(window).width()-$(".modal_content").outerWidth())/2+$(window).scrollLeft())+"px"
                 //팝업창을 가운데로 띄우기 위해 현재 화면의 가운데 값과 스크롤 값을 계산하여 팝업창 CSS 설정     
              }); 
        });
        
        $("#btn_close_modal").on("click",function(){
            $(".j_modal").attr("style","display:none");
            onChangeOpenPost();
        });
     });
  
    /* 비밀번호 확인 */
    const pwdInput = useRef();
    const pwdInput2 = useRef();
    const pwdCheck = () =>{
        //pwdInput.current.value  유저가 입력한 비번.
        // pwdInput2.current.value 재입력 비번.
        if(pwdInput.current.value !== pwdInput2.current.value){
            pwdCorrect.innerHTML = "❌ 비밀번호가 일치 하지 않습니다."
            setIsPasswordConfirm(false);
        }else{
            pwdCorrect.innerHTML = "✅ 비밀번호가 일치 합니다."
            setIsPasswordConfirm(true);
        }
    }
    /* 아이디 중복 체크  */
    function handleIdCheck(e){

        const handleIdCheck = async() => {
            
            // input 창에 값이 바뀔떄마다 state 값을 업뎃해줘야 그걸 받아서 post요청을 보내는데, 지금 state가 업뎃이 안되고 있음.
            await axios
            .post(baseUrl + '/member/memberIdCheck' , {user_id:user_id})
            .then( (response) => {
                //console.log(response.data.existing)
                // true(중복된아이디) / 없으면 false (사용가능아이디 )

                if(response.data.existing === true){
                    alert('이미 존재하는 아이디 입니다.');
                    check.innerHTML = "❌";
                    setIsId(false);
                }else{
                    alert('사용가능한 아이디 입니다.');
                    check.innerHTML = "✅";
                    setIsId(true);
                }
            })
            .catch( (error) => {
                console.log(error);
            })
        }
        handleIdCheck();
    }

    function handleJoin(e) {

        const check = document.getElementById("check");

        const handleJoin = async() => {
            e.preventDefault();
            await axios
                .post(baseUrl + '/member/join', 
                    {   
                        user_id:user_id, user_pwd:user_pwd,
                        user_name:user_name ,
                        addr_1 : zoneRef.current.value,
                        addr_2 : addRef.current.value , addr_3: addr_3,birth: birth,
                        phone : phone , email : email,
                        survey_code : survey_code , classification : classification
                    })
                .then( (response) => {
                    alert(response.data.user_id + '님 회원가입 되었습니다.');
                    document.location.href='/member/login'; // 로그인 창으로 보내기.
                    }
                )
                .catch((error) => {
                    console.log(error);
                })
        }
        
        if(check.innerHTML ==="✅" && pwdCorrect.innerHTML === "✅ 비밀번호가 일치 합니다."){
            handleJoin(); // 회원 가입 승인.
        }else{
            alert('필수 정보를 입력 해주세요.');
        }
    } 
    const handleCreate = (data) => {
        console.log(data);
      }

    return (
        <div className='join-wrap'>
            <div className='join-box'>
        <h4>JOIN</h4>
        <div id="joinForm">
                <div className="formbox">
                    <h3 class="join_title">아이디</h3>
                    <input
                    class="join_input"
                    type="text"
                    id="user_id"
                    maxLength="20"
                    onChange={handleId}
                    />
                </div>
                    <span id="check"></span><br/>
                    <button id="idCheckBtn"onClick={handleIdCheck}>중복체크</button>

                <div className="formbox">
                    <h3 class="join_title">비밀번호</h3>
                    <input
                        class="join_input"
                        type="password"
                        id="user"
                        maxLength="20"
                        onChange={handlePwd} value={user_pwd}
                        placeholder="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"
                        ref={pwdInput}
                    />
                </div>
                    <br/>
                    <span className={`${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
                    
                <div className="formbox">
                    <h3 class="join_title">비밀번호 재입력</h3>
                    <input
                        class="join_input"
                        type="password"
                        title="input password confirm"
                        maxLength="20"
                        onChange={pwdCheck}
                        ref={pwdInput2}
                    />
                </div>
                    <br/>
                    <span id="pwdCorrect"></span>
                <div className="formbox">    
                    <h3 class="join_title">이름</h3>
                    <input
                    class="join_input"
                    type="text"
                    required
                    maxLength="20"
                    onChange={handleName} value={user_name}
                    />
                </div>
                    <br/>
                    <span className={`${isName ? 'success' : 'error'}`}>{nameMessage}</span>

                <div className="formbox">
                    <h3 class="join_title">생년월일</h3>
                <input type="date" name="birth" id="birth" required
                onChange={handleBirth} value={birth}/>
                </div>
                <div className="formbox">
                    <h3 class="join_title">휴대전화</h3>
                    <input
                        class="join_input"
                        type="text"
                        title="input phone number"
                        required
                        maxLength="13"
                        onChange={handlePhone} value={phone}
                    />
                </div>
                <br/>

                <div className="formbox">
                    <h3 class="join_title">우편번호</h3>
                    <input
                        class="join_input"
                        type="text"
                        title="input addr_1"
                        maxLength="50"
                        value={isZoneCode}
                        ref={zoneRef}
                        readOnly
                    />
                </div>
                <button id="postCodeBtn" type='button' onClick={onChangeOpenPost} >우편번호찾기</button>
                <br/>
                <div className="formbox">
                    <h3 class="join_title">주소</h3>
                    <input
                        class="join_input"
                        type="text"
                        value={isAddress}
                        maxLength="50"
                        ref={addRef}
                        readOnly
                    />
                </div>

                <div className="formbox">
                    <h3 class="join_title">상세주소</h3>
                    <input
                        class="join_input"
                        type="text"
                        onChange={handleAddr3}
                        maxLength="50"
                    />
                </div>

                <div className="formbox">
                    <h3 class="join_title">이메일</h3>
                    <input
                        class="join_input"
                        type="text"
                        onChange={handleEmail} value={email}
                        title="input email"
                        required
                        maxLength="50"
                    />
                
                    <br/>
                </div>
                    <span className={`${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>

                <div className="formbox">
                    <h3 class="join_title">설문조사 코드</h3>
                        <input
                            class="join_input"
                            type="number"
                            min='1' max='1000' step='1'
                            onChange={handleSurveyCode} 
                            title="input survey_code"
                            maxLength="50"
                            placeholder="설문조사를 진행하신 후 발급받은 코드를 기입 해주세요."
                        />
                </div>
                    
                    <button id="joinBtn" onClick={handleJoin}
                        disabled={!(isId && isName && isEmail && isPassword && isPasswordConfirm && isUserAddress)}
                    >JOIN</button>


            </div>
            </div>
            <div class = "j_modal">
                <div class= "modal_content">
                    <div class= "modal_title">
                        <h3 style={{color:"black",fontSize:25,margin:17}}>우편번호찾기</h3>
                        <img className="closeBtnImg" src='/img/close.png' id="btn_close_modal" style={{width:30,height:30,marginLeft:200}}/>
                    </div>
                {isOpenPost  ? (
                <DaumPostcode style={postCodeStyle} autoClose onComplete={handleComplete } />
                ) : null}
                </div>	
                <div class="modal_layer"></div>
            </div>
        </div>
    )
};

export default Join;