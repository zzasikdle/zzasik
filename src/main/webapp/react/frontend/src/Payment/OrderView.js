/*eslint-disable*/


import './OrderView.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../config";

const OrderView = ( ) => {

    const id = sessionStorage.getItem("user_id");
    const code = sessionStorage.getItem("order_code");

    const [detailList, SetDetailList] = useState([]);

    useEffect(() => {
        async function call() {
            await axios
            .get(`${baseUrl}/order/viewOrder?user_id=${id}&order_code=${code}`)
            .then((response)=>{
                console.log(response.data);
                SetDetailList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        call();
    }, []);

    return(
        <div style={{position:"absolute", top:"80px", width:"100%"}}>
            <h1>주문 상세보기</h1>
            <hr />
                <table>
                    <thead>
                        <tr>
                            <th style={{textAlign:"center"}}>상품</th>
                            <th style={{textAlign:"center"}}>상품명</th>
                            <th style={{textAlign:"center"}}>수량</th>
                            <th style={{textAlign:"center"}}>가격</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detailList.length === 0 ?
                            null
                            :
                            detailList.map((order, key) => {
                                return(
                                    <tr key={key}>
                                        {console.log(order)}
                                        <td style={{textAlign:"center", width:"120px", height:"120px"}}><img src={order.productList[0].pro_img} style={{width:"100px", height:"100px"}} /></td>
                                        <td style={{textAlign:"center"}}>
                                            <Link to={`/shop/product/view/${order.pro_code}`} style={{textDecoration:"none"}}>{order.productList[0].pro_name}</Link>
                                        </td>
                                        <td style={{textAlign:"center"}}>{order.quantity}</td>
                                        <td style={{textAlign:"center"}}>{(order.productList[0].pro_price)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Link to="/myhome/myOrder"><button type='button' style={{width:"80px", height:"30px", border:"1px solid darkgray", marginTop:"30px"}}>돌아가기</button></Link>
        </div>
    )
}

export default OrderView;