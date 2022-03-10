import axios from 'axios';
import { useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import './addAddress.css';

const AddAddress = () => {

    const baseUrl = "http://localhost:8090";
    

    const user_id = sessionStorage.getItem("user_id");
    

    /* 휴대전화 */
    const [ codeNo , setCodeNo] = useState('');
    const [ secondPhone , setSecondphone] = useState('');
    const [ thirdPhone , setThirdphone] = useState('');
    

    /* 서버로 넘겨줄 값. */

    const [ phone , setPhone] = useState('');

    const addr_title = useRef();
    const addr_receiver = useRef();
    
    
    /* 주소 검색 api */

    const addRef = useRef(); //주소
    const zoneRef = useRef(); //우편번호
    const addDeRef = useRef(); //상세주소

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
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "50%",
    width: "400px",
    height: "500px",
    padding: "7px",
  };

    //유효성 검사 ( 각 칸을 모두 적었는지 )
    const [isUserAddress ,setUserAddress] = useState(false);


    // 전화번호
    
    const handleCodeNo = (e) => {
        setCodeNo(e.target.value); // 지역번호 저장.
    }

    const handleSecondPhone = (e) => {
        setSecondphone(e.target.value);
    }

    const handleThirdPhone = (e) => {
        setThirdphone(e.target.value);
    }
    


    function addAddress(e) {

        const addr_phone = codeNo + secondPhone + thirdPhone ; 
        
        const addAddress = async() => {
            
            await axios
                .post(baseUrl + '/member/addAddress', 
                    {   
                        user_id:user_id, addr_title: addr_title.current.value,
                        addr_receiver :addr_receiver.current.value,
                        addr_phone : addr_phone,
                        addr_1 : zoneRef.current.value,
                        addr_2 : addRef.current.value , addr_3: addDeRef.current.value
                    })
                .then( (response) => {
                    alert(response.data.message);
                    document.location.href='/myhome/myAddress';
                    }
                )
                .catch((error) => {
                    console.log(error);
                })
        }
        
        // if(check.innerHTML ==="✅" && pwdCorrect.innerHTML === "✅ 비밀번호가 일치 합니다."){
        //     handleJoin(); // 회원 가입 승인.
        // }else{
        //     alert('필수 정보를 입력 해주세요.');
        // }

        addAddress(); // 함수 실행.
    } 


    return (
        <>
            <div className='box container' >
                <div className="setting_popup_title">
                    <h2 className="h_title">배송지 정보 상세</h2>
                </div>

                <table className="tbl_delivery_info">
                    <caption>
                        <span className="blind">배송지 정보 입력 폼</span>
                    </caption>
                    <colgroup>
                        <col className="cell_title"></col>
                        <col></col>
                    </colgroup>
                        <tbody>
                            <tr>
                                <th className="cell_title">배송지명</th>
                                <td>
                                    <span className="_editable_input _input basic_input focus" style={{width: "133px"}}>
                                        <label for="addressName" className="lb_text blind">배송지명 입력</label>
                                        <input type="text" id="addressName" className="ip_text" ref={addr_title} maxlength="150"></input>
                                        <input type="hidden" id="hash" className="ip_text" value></input>
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <th className="cell_title" >수령인
                                    <em className="mark_necessity" >
                                        <span className="blind">필수입력</span>
                                    </em>
                                </th>
                                <td>
                                    <span className="_editable_input _input basic_input" style={{width: "133px"}}>
                                        <label for="receiver" className="lb_text ">150자 이내로 입력</label>
                                        <input type="text" id="receiver" className="ip_text" ref={addr_receiver} maxlength="150" ></input>
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <th className="cell_title">주소 
                                    <em className="mark_necessity">
                                        <span className="blind">필수입력</span>
                                    </em>
                                </th>
                                <td>
                                    <span className="_input basic_input" style={{width:"64px"}}>
                                        <label for="zipCode" className="lb_text blind" >우편번호 입력</label>
                                        <input type="text" id="zipCode" className="ip_text" disabled="disabled" value={isZoneCode}
                                            ref={zoneRef} readOnly></input>
                                    </span>
                                    <button className="_search setting_btn green" onClick={onChangeOpenPost} >주소검색</button>
                                    {isOpenPost  ? (
                                        <DaumPostcode style={postCodeStyle} autoClose onComplete={handleComplete } />
                                        ) : null}<br/>
                                    <p className="address_detail">
                                        <span className="_input basic_input" style={{width: "338px"}}>
                                            <label for="baseAddress" className="lb_text blind" >배송지 새주소</label>
                                            <input 
                                                type="text" id="baseAddress" className="ip_text" disabled="disabled"
                                                value={isAddress}
                                                ref={addRef}>
                                            </input> 
                                            <input type="hidden" id="roadNameAddressYn"></input>
                                        </span>
                                    </p>
                                    <p className="address_detail" >
                                        <span className="_editable_input _input basic_input" style={{width: "338px"}}>
                                            <label for="detailAddress"  className="lb_text">
                                            
                                            </label>
                                            <input type="text" id="detailAddress"  className="ip_text"  maxlength="100" ref={addDeRef} placeholder="상세 주소를 입력해주세요."></input>
                                        </span>
                                    </p>
                                </td>
                            </tr>

                            <tr>
                                <th className="cell_title">연락처
                                    <em className="mark_necessity">
                                        <span className="blind" >필수입력</span>
                                    </em>
                                </th>

                                <td>
                                    <span className="_tel1box setting_selectbox" style={{width:"68px"}}>
                                            <select onChange={handleCodeNo}>
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
                                    <span className="hyphen">-</span>
                                    <span className="_editable_input _input basic_input" style={{width: "48px"}}>
                                        <label for="telNo1Second" className="lb_text blind">연락처 두번째자리 입력</label>
                                        <input type="text" id="telNo1Second" className="ip_text" maxlength="4" onChange={handleSecondPhone}></input>
                                    </span>
                                    <span className="hyphen">-</span>
                                    <span className="_editable_input _input basic_input" style={{width: "48px"}}>
                                        <label for="telNo1Third" className="lb_text blind" >연락처 세번째자리 입력</label>
                                        <input type="text" id="telNo1Third"  className="ip_text" maxlength="4"  onChange={handleThirdPhone} ></input>
                                    </span>
                                </td>
                            </tr>
                            
                            <tr>
                                <th className="cell_title" >기본배송지 </th>
                                <td>
                                    <span className="default_delivery">
                                        <span className="_checkbox _input setting_checkbox">
                                            <input type="checkbox"  id="baseAddressYn"></input>
                                        </span>
                                        <label for="baseAddressYn" className="lb_text" >기본 배송지로 설정</label>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                </table>
                <div className="delivery_notice">
                    <p className="desc" >· 입력/수정하신 배송지는 배송지 목록에 저장됩니다.</p>
                </div>
            </div>

            <div id="pop_footer">
                <button>닫기</button>
                <button onClick={addAddress}>저장</button>
            </div>
        </>
    )
}

export default AddAddress;