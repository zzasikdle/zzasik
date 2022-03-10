
import axios from 'axios';
import { useEffect, useState } from 'react';
import './MyAddress.css';
import {Link} from 'react-router-dom';

const MyAddress  =() => {

    const baseUrl = "http://localhost:8090";

    const user_id = sessionStorage.getItem("user_id");
    
    const [ AddressList,  setAddressList] = useState([]); // 배열로 배송지 리스트 받아옴. 
    
    const [addr_receiver , setAddr_receiver] = useState('');

    // function listAddress(e) {

    //     const listAddress = async() => {

    //         await axios
    //             .get(baseUrl + '/member/listAddress' , {params:{user_id:user_id}})
    //             .then( (response) => {
    //                 setAddressList(response.data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }

    //     listAddress();
    // }

    // listAddress();

    useEffect(()=>{
        axios.get(baseUrl + '/member/listAddress' , {params:{user_id:user_id}})
            .then((response) => {
                setAddressList(response.data);
                })
            .catch((error)=> {
                console.log(error);
            })
    },[user_id]);



    return(
        <div className='box container' >
            <div id="content" className="delivery_setting">

                <h2 className="setting_title" >배송지 목록</h2>

                <div className="desc_delivery">
                    <p className="desc">배송지를 최대 15개까지 함께 관리하실 수 있습니다.
                    <br/>
                    자주 쓰는 배송지를 편리하게 통합 관리 하세요!
                    </p>
                    <button className="_insert setting_btn green_bg" ><Link to='/myhome/addAddress' id='addAddress'>배송지 등록</Link></button>
                </div>

                <div className="delivery_list_area">
                    <table className="tbl_delivery_list">
                        
                        <colgroup>
                            <col className="cell_delivery"/>
                            <col/>
                            <col className="cell_tel"/>
                            <col className="cell_edit"/>
                        </colgroup>

                        <thead>
                            <tr>
                                <th scope="col" className="cell_delivery" >배송지</th>
                                <th scope="col">주소</th>
                                <th scope="col" className="cell_tel">연락처</th>
                                <th scope="col" className="cell_edit">수정 · 삭제</th>
                            </tr>
                        </thead>

                        <tbody>
                            {AddressList.length ===0 ? 
                            <tr>
                                <td className="cell_delivery">
                                    <strong className="nick"></strong>
                                    
                                </td>

                                <td>
                                    <span className="zipcode"></span>
                                    등록된 배송지 정보가 없습니다.
                                </td>

                            </tr>
                            : 
                            AddressList.map( (Address , key) => {
                                return (
                                    <tr key={key} >
                                        <td className="cell_delivery">
                                            <strong className="nick">{Address.addr_title}</strong>
                                            <span className="mark_default">{Address.addr_receiver}</span>
                                        </td>

                                        <td>
                                            <span className="zipcode">{Address.addr_1}</span>
                                            {Address.addr_2}
                                            <br/>
                                            {Address.addr_3}
                                        </td>

                                        <td className="cell_tel">{Address.addr_phone}</td>
                                        <td className="cell_edit">
                                            <button className="_delete setting_btn type_h">
                                                <Link to={`/myhome/modAddress/${Address.addr_receiver}`} id='modAddress'>수정</Link>
                                                
                                                {/* <Link to={{
                                                        pathname: `/myhome/modAddress/${this.state.addr_receiver}`,
                                                            state: { 
                                                                addr_receiver : this.state.addr_receiver,
                                                            }
                                                    }}>수정</Link> */}
                                                
                                                </button>
                                            
                                            <button className="_delete setting_btn type_h">삭제</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                
                
            </div>
        </div>
    )
}

export default MyAddress ; 