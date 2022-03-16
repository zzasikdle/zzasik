import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../config";

const CheckProduct = ( ) => {

    const [order, setOrder] = useState({});
    const code = sessionStorage.getItem("order_code");

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
                        <td>상품명</td>
                        <td>{order.pro_code}</td>
                    </tr>
                    <tr>
                        <td>수량</td>
                        <td>{order.quantity}</td>
                    </tr>
                    <tr>
                        <td>총 상품 가격</td>
                        <td>{order.order_price}원</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Link to="/order/pay">다음</Link>
        <Link to="/">취소</Link>
        </>
    )
}

export default CheckProduct;