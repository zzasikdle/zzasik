import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { baseUrl } from "../config";

const Cart = () => {

    const history = useHistory();

    const [cartList, setCartList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [product, setProduct] = useState();
    const id = sessionStorage.getItem("user_id");

    useEffect(() => {
        async function call() {
            await axios
            .get(baseUrl+'/cart/listProducts', {params:{user_id:id}})
            .then((response)=>{
                console.log(response.data);
                setCartList(response.data);
                cartList.map(cart => {
                    //console.log(cart);
                    console.log(cart.productList[0]);
                    console.log(cart.productList[0].pro_code);
                })
            })
            .catch((error) => {
                console.log(error);
            })
        }
        call();      
    }, []);

    const goToCheck = async( ) => {
        const formData = new FormData();        
        cartList.map(cart => {
            formData.append("user_id", sessionStorage.getItem("user_id"));
            formData.append("pro_code", cart.pro_code);
            formData.append("quantity", cart.quantity);
            const pro_price = cart.productList[0].pro_price;
            const order_price = pro_price*cart.quantity;
            formData.append("order_price", order_price);
            console.log("=================");
            console.log(cart.pro_code);
            console.log(cart.quantity);
            console.log(pro_price);
            console.log(order_price);
            console.log("=================");
        })

        await axios
        .post(baseUrl+"/order/addProduct", formData,
              {headers : {"Content-Type":"multipart/form-data; boundary=${formData._boundary"}})
        .then((response) => {
            alert(response.data.message);
            history.push(response.data.path);
        })
        .catch((error) => {
            console.log(error);
        })
    }

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
                        <>
                        <ul id="productul" style={{float:"left"}}>
                        <li id="productli" style={{textAlign:"center"}} key={key}>
                            <input type="checkbox" value={cart.pro_code} />
                            <Link to={`/shop/product/view/${cart.pro_code}`} style={{textDecoration:"none"}}>
                                <div><img src={cart.productList[0].pro_img} style={{width:"150px", height:"150px"}} /></div>
                                <div>상품명 : {cart.productList[0].pro_name}</div>
                                <div>수량 : {cart.quantity}</div>
                            </Link>
                        </li>
                        </ul>
                        </>
                    )
                })
                }
                <div>총 상품 금액</div>
                <Link to="/shop/product">계속 쇼핑하기</Link>
                <input type="button" value="결제하기" onClick={goToCheck} />
                </div>
        </div>
    )
}

export default Cart;