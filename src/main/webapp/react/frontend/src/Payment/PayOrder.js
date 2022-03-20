/*eslint-disable*/


import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../config";
import Payment from "./Payment.js";

const PayOrder = ( ) => {

    const history = useHistory();

    const [order, setOrder] = useState({});
    const code = sessionStorage.getItem("order_code");
    console.log(code);

    const user_id = sessionStorage.getItem("user_id");
    console.log("user_id : "+sessionStorage.getItem("user_id"));

    const [order_status, setStatus] = useState();
    const [order_price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [pro_code, setProCode] = useState();

    useEffect(() => {
        async function call() {
            await axios
            .get(baseUrl+'/order/checkProduct', {params:{order_code:code}})
            .then((response)=>{
                console.log(response.data);
                setOrder(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        call();      
    }, []);

    const removeOrder = async() => {
        await axios
        .delete(`${baseUrl}/order/removeOrder?order_code=${code}`)
        .then((response) => {
			alert(response.data.message);
            history.push(response.data.path);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    
    return(
        <>
        <div>
            <h1>결제 정보</h1>
            <table>
                <tbody>
                    <tr>
                        <td>주문번호</td>
                        <td>{order.order_code}</td>
                    </tr>
                    <tr>
                        <td>총 상품 가격</td>
                        <td>{order.order_price}</td>
                    </tr>
                    <tr>
                        <td>총 결제액</td>
                        <td>{order.order_price}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div>
            <p>위 주문 내용을 확인하였으며, 회원 본인은 개인정보 이용 및 제공 및 결제에 동의합니다.</p>
        </div>

        <Link to="#" onClick={removeOrder}>취소</Link>
        <Payment />
        </>
    )
}
 
export default PayOrder;