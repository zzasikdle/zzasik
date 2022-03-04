import { useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import './OrderList.css';

/* 주문 내역 보여주기 */
const OrderList = () => {
    const [ orderList,setOrderList] = useState([]);

    useEffect(()=>{
        axios
        .get('/myhome/order')
        .then((response)=>{
            console.log(response.data);
            setOrderList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);

    return (
        <div className="box table-section">
            <h2>주문 목록</h2>
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
                        <th scope="col">날짜</th>
                        <th scope="col">주문번호</th>
                        <th scope="col">상품정보</th>
                        <th scope="col">결제금액</th>
                        <th scope="col">상태</th>
                    </tr>
                </thead>

                <tbody>
                    {orderList.length===0 ?
                    <tr height="10">
                        <td colSpan="5">
                            <p style={{align:"center"}}>
                                <b><span style={{fontSize:"9pt"}}>주문 내역이 없습니다.</span></b>
                            </p></td>
                    </tr>
                    :
                    orderList.map((order,key) => {
                        return(
                            <tr>
                                <td id='order_date'></td>
                                <td id='order_id'></td>
                                <td id='pro_info'></td>
                                <td id='total_price'></td>
                                <td id='order_state'></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderList;