import axios from "axios";
import { useState } from "react";


const Join = () => {

    const baseUrl = "http://localhost:8090";

    const [user_id, setId] = useState(''); 
    const [user_pwd, setPwd] = useState('');
    const [user_name, setName] = useState('');
    const [addr_1, setAddr1] = useState('');
    const [addr_2, setAddr2] = useState(''); 
    const [addr_3, setAddr3] = useState('');
    const [birth, setBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState(''); 
    const [classification, setClassification] = useState(''); 
    const [survey_code, setSurveyCode] = useState('');
    

    //https://wonyoung2257.tistory.com/4  참고하여 간략하게 바꾸기.

    const handleId = (e) => {
        const id = document.getElementById("user_id");
        setId(id.value);
        console.log(id.value);
        console.log(e);
        console.log(user_id);
    }

    const handlePwd = (e) => {
        setPwd(e.target.value);
        console.log(user_pwd);
    }

    const handleName = (e) => {
        setName(e.target.value);
        console.log(user_name);
    }

    const handleAddr1 = (e) => {
        setAddr1(e.target.value);
        console.log(addr_1);
    }

    const handleAddr2 = (e) => {
        setAddr2(e.target.value);
        console.log(addr_2);
    }

    const handleAddr3 = (e) => {
        setAddr3(e.target.value);
        console.log(addr_3);
    }

    const handleBirth = (e) => {
        setBirth(e.target.value);
        console.log(birth);
    }

    const handlePhone = (e) => {
        setPhone(e.target.value);
        console.log(phone);
    }

    const handleEmail= (e) => {
        setEmail(e.target.value);
        console.log(email);
    }

    const handleSurveyCode = (e) => {
        setSurveyCode(e.target.value);
        console.log(survey_code);
    }


    const handleClassification = (e) => {
        setClassification(e.target.value);
        console.log(classification);
    }

    /* 아이디 중복 체크  */
    function handleIdCheck(e){

        console.log("아이디 체크 진입");

        const check = document.getElementById("check");
        
        const handleIdCheck = async() => {
            
            e.preventDefault();

            await axios
            .post(baseUrl + '/member/memberIdCheck' , {user_id : user_id})
            .then( (response) => {
                console.log(response.data.existing)

                if(response.data.existing === true){
                    
                    check.innerHTML="❌";
                }else{
                    
                    check.innerHTML="✅";
                }
            })
            .catch( (error) => {
                console.log(error);
            })
        }
        handleIdCheck();
        
        
    }



    function handleJoin(e) {

        handleId(); // 회원가입 버튼 누르면 그 때서야 user_id state 값 저장하기.

        const check = document.getElementById("check");

        const handleJoin = async() => {
            e.preventDefault();

            console.log(user_id);
            console.log(user_pwd);
            console.log(user_name);
            
            

            await axios
                .post(baseUrl + '/member/join', 
                    {   
                        user_id:user_id, user_pwd:user_pwd,
                        user_name:user_name , addr_1 : addr_1,
                        addr_2 : addr_2 , addr_3: addr_3,birth: birth,
                        phone : phone , email : email,
                        survey_code : survey_code , classification : classification
                    })
                .then( (response) => {
                    console.log(response.status);
                    console.log(response.data.user_id);
                    alert(' 회원가입 되었습니다.');
                    document.location.href='/member/login'; // 로그인 창으로 보내기.
                    }
                )
                .catch((error) => {
                    console.log(error);
                })
        }
        if(check.innerHTML ==="✅"){
            handleJoin(); // 함수 실행
        }else{
            alert('필수 정보를 입력 해주세요.');
        }
    } 

    return (

        <div>

            <h3 class="join_title">분류</h3>
            <input
            class="join_input"
            type="text"
            maxLength="20"
            onChange={handleClassification} value={classification}
            />


            <h3 class="join_title">아이디</h3>
            <input
            class="join_input"
            type="text"
            id="user_id"
            maxLength="20"
            onChange={handleIdCheck} 
            />
		    <span id="check" ></span>
            <button onClick={handleIdCheck}>중복체크</button>

            <h3 class="join_title">비밀번호</h3>
            <input
                class="join_input"
                type="user_pwd"
                maxLength="20"
                onChange={handlePwd} value={user_pwd}
             />
             <h3 class="join_title">비밀번호 재입력</h3>
            <input
                class="join_input"
                type="text"
                title="input password confirm"
                maxLength="20"
            />

            <h3 class="join_title">이름</h3>
            <input
            class="join_input"
            type="text"
            maxLength="20"
            onChange={handleName} value={user_name}
            />

            <h3 class="join_title">생년월일</h3>
          <input type="date" name="birth" id="birth"
           onChange={handleBirth} value={birth}/>

          <h3 class="join_title">휴대전화</h3>
          <input
            class="join_input"
            type="text"
            title="input phone number"
            maxLength="13"
            onChange={handlePhone} value={phone}
          />

           <h3 class="join_title">주소1</h3>
          <input
            class="join_input"
            type="text"
            title="input addr_1"
            maxLength="50"
            onChange={handleAddr1} value={addr_1}
          />

            <h3 class="join_title">주소2</h3>
            <input
                class="join_input"
                type="text"
                onChange={handleAddr2} value={addr_2}
                maxLength="50"
            />

            <h3 class="join_title">주소3</h3>
            <input
                class="join_input"
                type="text"
                onChange={handleAddr3} value={addr_3}
                maxLength="50"
            />

            <h3 class="join_title">이메일</h3>
            <input
                class="join_input"
                type="text"
                onChange={handleEmail} value={email}
                title="input email"
                maxLength="50"
            />


           <h3 class="join_title">설문조사 코드</h3>
            <input
                class="join_input"
                type="text"
                onChange={handleSurveyCode} value={survey_code}
                title="input survey_code"
                maxLength="50"
            />
            
            <p><button onClick={handleJoin}>회원가입</button></p>

        </div>
    
    )
};

export default Join;