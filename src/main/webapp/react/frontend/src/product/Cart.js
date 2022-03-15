import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { baseUrl } from "../config";

const Cart = () => {

    const [cartList, setCartList] = useState([]);
    const id = sessionStorage.getItem("user_id");
    const {user_id} = useParams();

    useEffect(() => {
        async function call() {
            await axios
            .get(baseUrl+'/cart/listProducts', {params:{user_id:id}})
            .then((response)=>{
                setCartList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        call();      
    }, []);

    let result = [];

    return(
        <div>
            <div id="wrapper">
                {cartList.length === 0 ?
                <div>
                    <p style={{textAlign:"center"}}>
                        <b><span style={{fontSize:"9pt"}}></span></b>
                    </p>
                    장바구니에 상품이 없습니다.
                </div>
                :
                cartList.map((cart, key) => {
                    return(
                        <ul id="productul" style={{float:"left"}}>
                        <li id="productli" style={{textAlign:"center"}} key={key}>
                            <Link to={`/shop/product/view/${cart.pro_code}`} style={{textDecoration:"none"}}>
                                <div>상품코드 : {cart.pro_code}</div>
                                <div>수량 : {cart.quantity}</div>
                            </Link>
                        </li>
                        </ul>
                        )
                })
                }
                </div>
        </div>
    )
}

export default Cart;