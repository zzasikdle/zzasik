/*eslint-disable*/

import axios from 'axios';
import { useEffect, useState } from 'react';
import './MyAddress.css';
import {Link} from 'react-router-dom';
import Pagination from "../../../components/notice/Pagination";

const MyAddress  =() => {

    const baseUrl = "http://localhost:8090";

    const user_id = sessionStorage.getItem("user_id");
    
    const [ AddressList,  setAddressList] = useState([]); // 배열로 배송지 리스트 받아옴. 
    
    const [ limit, setLimit] = useState(4);    //한 페이지당 표시할 게시물 개수
    const [ page, setPage] = useState(1);
    const offset = (page - 1) * limit;


    useEffect(()=>{
        axios.get(baseUrl + '/member/listAddress' , {params:{user_id:user_id}})
            .then((response) => {
                setAddressList(response.data);
                })
            .catch((error)=> {
                console.log(error);
            })
    },[user_id]);


    const deleteAddress = async(addr_title) => {
        
        await axios
         .post(baseUrl + '/member/deleteAddress',  {user_id:user_id , addr_title : addr_title})
         .then( (response) => {
            alert('배송지 삭제가 완료 되었습니다.');
            document.location.href='/myhome/myAddress';
         })
         .catch((error)=> {
            console.log(error);
        })
    }

    

    return(
        <>
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
                                AddressList.slice(offset, offset + limit).map( (Address , key) => {
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
                                                    <Link to={`/myhome/updateAddress/${Address.addr_receiver}`} id='UpdateAddress'>수정</Link>
                                                </button>
                                                <button className="_delete setting_btn type_h" onClick={ () => deleteAddress(Address.addr_title)}>
                                                    삭제
                                                </button>
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
            <footer>
                <Pagination
                    total={AddressList.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </footer>
        </>
    )
}

export default MyAddress ; 