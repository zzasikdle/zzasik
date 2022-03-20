/*eslint-disable*/


import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../config";

const OrderList = ( ) => {

    const history = useHistory();

    const id = sessionStorage.getItem("user_id");
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        async function call() {
            await axios
            .get(baseUrl+'/order/listOrder', {params:{user_id:id}})
            .then((response)=>{
                console.log(response.data);
                setOrderList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        call();      
    }, []);

    const goToDetail = (e) => {
        console.log(e);
        console.log(orderList[e]);
        const order_code = orderList[e].order_code;
        sessionStorage.setItem("order_code", order_code);
        history.push(`/order/view/:${order_code}`);
    }

    return(
        <div>
            <div style={{padding:"20px"}}>
                <h1>주문내역</h1>
                <hr />
                    <table>
                        <thead>
                            <tr>
                                <th style={{align:"center"}}>주문번호</th>
                                <th style={{align:"center"}}>날짜</th>
                                <th style={{align:"center"}}>가격</th>
                                <th style={{align:"center"}}>배송 상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.length === 0 ?
                                <tr>
                                    <td colSpan="4">
                                        <p style={{align:"center"}}>
                                            <b><span style={{fontSize:"9pt"}}>주문내역이 없습니다.</span></b>
                                        </p>
                                    </td>
                                </tr>
                                :
                                orderList.map((order, key) => {
                                    return(
                                            <tr id={key} key={key} onClick={(e) => goToDetail(e.target.getAttribute("id"))} style={{cursor:"pointer"}}>
                                                <td id={key} style={{align:"center"}}>{order.order_code}</td>
                                                <td id={key} style={{align:"center"}}>{order.order_time}</td>
                                                <td id={key} style={{align:"center"}}>{order.order_price}</td>
                                                <td id={key} style={{align:"center"}}>{order.order_status}</td>
                                            </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            </div>
        </div>
    )
}

export default OrderList;