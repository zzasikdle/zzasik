import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useParams } from "react-router-dom";
import './modAddress.css';

const ModAddress = () => {

    const baseUrl = "http://localhost:8090";
    const {addr_receiver} = useParams(); // 원래 receiver 
    const user_id = sessionStorage.getItem("user_id");
    const [ Address,  setAddress] = useState({}); // Address는 key값과 value로 이루어진 객체이기 떄문에 {}로 받아줘야 값을 정상적으로 받을 수 있다.

    /* 휴대전화 */
    const [ codeNo , setCodeNo] = useState('');
    const [ secondPhone , setSecondphone] = useState('');
    const [ thirdPhone , setThirdphone] = useState('');
    

    /* 서버로 넘겨줄 값. */

    const [ addr_title , setAddr_title ]  = useState(Address.title);
    const [ addr_Revisedreceiver , setRevisedreceiver ] = useState(addr_receiver);
    const  [ addr_phone , setAddr_phone ]  = useState(Address.phone);
    const [ addr_1 , setAddr_1 ] = useState(Address.addr_1);
    const [ addr_2 , setAddr_2 ] = useState(Address.addr_2);
    const [ addr_3 , setAddr_3 ] = useState(Address.addr_3);
    
    const handleAddr_title = (e) => {
        setAddr_title(e.target.value);
    }
    const handleReceiver = (e) => {
        setRevisedreceiver(e.target.value);
    }
    

    const handlePhone = () => {
        setAddr_phone(codeNo + secondPhone + thirdPhone) ; 
    }
    const handleAddr_1 = (e) => {
        setAddr_1(e.target.value);
    }
    const handleAddr_2 = (e) => {
        setAddr_2(e.target.value);
    }
    const handleAddr_3 = (e) => {
        setAddr_3(e.target.value);
    }
    
    /* 주소 검색 팝업  */
    const [modalOn , setModalOn] = useState(false);
    const onOpenModal = ()=>{
        setModalOn(!modalOn);
    }

    const handleAddress = () => {
        // id 가 zipcode 인 input을 가져와서 value를 addr_1로  바꿔주기.
        zoneRef.current.value = isZoneCode;
        addRef.current.value= isAddress;
        onOpenModal();
    }


    const Modal  = (props) => {
        const { children, onClick } = props;
        
        return (
            
            <div className="modal"> 
                        <div className="bg"></div>
                         <div className="modalBox"> 
                            <table className="tbl_delivery_info">
                                <tbody>
                                    <tr>
                                        <th className="cell_title">우편번호</th>
                                        <td>
                                            <span className="_editable_input _input basic_input focus" style={{width: "133px"}}>
                                                <label htmlFor="addressName" className="lb_text blind">배송지명 입력</label>
                                                <input type="text" id="addressName" className="ip_text" onChange={handleAddr_1} value={isZoneCode}  maxLength="150"/>
                                               
                                            </span>
                                            <button onClick={onChangeOpenPost}>주소검색</button>
                                                {isOpenPost  ? (
                                                    <DaumPostcode style={postCodeStyle} autoClose onComplete={handleComplete } />
                                                    ) : null}<br/> 
                                        </td>
                                    </tr>

                                    <tr>
                                        <th className="cell_title">주소</th>
                                        <td>
                                            <span className="_editable_input _input basic_input focus" style={{width: "133px"}}>
                                                <label htmlFor="addressName" className="lb_text blind">배송지명 입력</label>
                                                <input type="text" id="addressName" className="ip_text"  onChange={handleAddr_2} value={isAddress}  maxLength="150"/>
                                                    
                                        
                                                
                                            </span>
                                            
                                        </td>
                                    </tr>
                                    
            
                                    


                                    <div id="pop_footer" class="btn_footer">
                                        <button  onClick={handleAddress}>저장</button> 
                                        <button  onClick={onOpenModal}>닫기</button> 
                                    </div>
                                </tbody>
                            </table>
                        </div> 
            </div>
          )
    }

    
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
        setCodeNo(e.target.value);
    }

    const handleSecondPhone = (e) => {
        setSecondphone(e.target.value);
    }

    const handleThirdPhone = (e) => {
        setThirdphone(e.target.value);
    }
    

    // 기본 값 을 useState를 써서 기본값으로 저장해놓고 바뀐값만 업데이트 되도록 한다.

    function updateAddress(e) {

        handlePhone(); // 전화번호 융합.
        
        console.log(addr_title);
        console.log(addr_receiver);
        console.log(addr_title);
        console.log(addr_title);
        console.log(addr_title);

        const updateAddress = async() => {
            
            await axios
                .post(baseUrl + '/member/updateAddress', 
                    {   
                        user_id:user_id, addr_title: addr_title,
                        addr_receiver : addr_receiver ,  // 원래 receiver , params 값
                        addr_Revisedreceiver : addr_Revisedreceiver, // 바뀔 수령인
                        addr_phone : addr_phone,
                        addr_1 : addr_1,
                        addr_2 : addr_2 , addr_3: addr_3
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

        updateAddress(); // 함수 실행.
    } 

    
    

    useEffect(()=>{
        axios.get(baseUrl + '/member/getAddress' , {params:{user_id:user_id , addr_receiver : addr_receiver}})
            .then((response) => {
                setAddress(response.data);
                })
            .catch((error)=> {
                console.log(error);
            })
    },[user_id]);

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
                                        <label htmlFor="addressName" className="lb_text blind">배송지명 입력</label>
                                        <input type="text" id="addressName" className="ip_text"  onChange={handleAddr_title}  maxLength="150">
                                            
                                        </input>
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
                                        
                                        <input type="text" id="receiver" className="ip_text" onChange={handleReceiver}  maxLength="150" ></input>
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
                                        <label htmlFor="zipCode" className="lb_text blind" >우편번호 입력</label>
                                        <input type="text" id="zipCode" className="ip_text" disabled="disabled" 
                                            onChange={handleAddr_1} ref={zoneRef}  readOnly></input>
                                    </span>
                                    {/* <button className="_search setting_btn green" onClick={onChangeOpenPost} >주소검색</button>
                                    {isOpenPost  ? (
                                        <DaumPostcode style={postCodeStyle} autoClose onComplete={handleComplete } />
                                        ) : null}<br/> */}

                                    <button className='popUp' onClick={onOpenModal} >주소검색</button>
                                    {modalOn ? <Modal ></Modal> : ''}



                                    <p className="address_detail">
                                        <span className="_input basic_input" style={{width: "338px"}}>
                                            <label htmlFor="baseAddress" className="lb_text blind" >배송지 새주소</label>
                                            <input 
                                                type="text" id="baseAddress" className="ip_text" disabled="disabled"
                                                value={isAddress} onChange={handleAddr_2} ref={addRef}  
                                                >
                                            </input> 
                                            <input type="hidden" id="roadNameAddressYn"></input>
                                        </span>
                                    </p>
                                    <p className="address_detail" >
                                        <span className="_editable_input _input basic_input" style={{width: "338px"}}>
                                            <label htmlFor="detailAddress"  className="lb_text">
                                            
                                            </label>
                                            <input type="text" id="detailAddress"  className="ip_text"  maxLength="100" onChange={handleAddr_3} ref={addDeRef} ></input>
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
                                                <option defaultValue >선택</option>
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
                                        <label htmlFor="telNo1Second" className="lb_text blind">연락처 두번째자리 입력</label>
                                        <input type="text" id="telNo1Second" className="ip_text" maxLength="4"  onChange={handleSecondPhone}></input>
                                    </span>
                                    <span className="hyphen">-</span>
                                    <span className="_editable_input _input basic_input" style={{width: "48px"}}>
                                        <label htmlFor="telNo1Third" className="lb_text blind" >연락처 세번째자리 입력</label>
                                        <input type="text" id="telNo1Third"  className="ip_text" maxLength="4"  onChange={handleThirdPhone} ></input>
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
                                        <label htmlFor="baseAddressYn" className="lb_text" >기본 배송지로 설정</label>
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
                <button onClick={updateAddress}>저장</button>
            </div>
        </>
    )
}

export default ModAddress;