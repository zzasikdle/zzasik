/*eslint-disable*/



import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { baseUrl } from "../config";

const Cart = () => {

    const history = useHistory();
    //const {pro_code} = useParams();

    const [cartList, setCartList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [pro_code, setCode] = useState();
    const id = sessionStorage.getItem("user_id");

    useEffect(() => {
        async function call() {
            await axios
            .get(baseUrl+'/cart/listProducts', {params:{user_id:id}})
            .then((response)=>{
                console.log(response.data);
                setCartList(response.data);

                const list = [];
                console.log("t");
            
                for(let i=0; i<response.data.length; i++) {
                    const quan = response.data[i].quantity;
                    console.log("quan"+quan);
                    const price = (Number(response.data[i].productList[0].pro_price)*quan);
                    list.push(price);
                    console.log(i+":"+list[i]);
                }
                console.log(list);
            
                let sumsum = 0;
                list.forEach((item) => {
                    sumsum += item;
                    console.log(sumsum);
                });
                
                sessionStorage.setItem("order_price", sumsum);

                const element = document.getElementById("totalPrice");
                element.innerHTML = "<div> 총 금액 "+sumsum+"원</div>";
            })
            .catch((error) => {
                console.log(error);
            })
        }
        call();
    }, []);

    const goToCheck = async( ) => {
        const formData = new FormData();
        formData.append("user_id", id);
        const order_price = sessionStorage.getItem("order_price");
        formData.append("order_price", order_price);

            await axios
                .post(baseUrl+"/order/addProduct", formData,
                      {headers : {"Content-Type":"multipart/form-data; boundary=${formData._boundary"}})
                .then((response) => {
                    alert(response.data.message);
                    history.push(response.data.path);
                    sessionStorage.setItem("order_code", response.data.order_code);
                })
                .catch((error) => {
                    console.log(error);
                })
    }

    const removeCart = async(e) => {       
        console.log(e.target.hasAttribute("data-key")); 
        await axios
        .delete(`${baseUrl}/cart/removeProduct?user_id=${id}&pro_code=${e.target.getAttribute("data-key")}`)
        .then((response) => {
            alert(response.data.message);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const removeAllCart = async() => {
        await axios
        .delete(`${baseUrl}/cart/removeAllProduct?user_id=${id}`)
        .then((response) => {
            alert(response.data.message);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const totalPrice = async( ) => {
        const list = [];
    
        for(let i=0; i<cartList.length; i++) {
            const quan = document.getElementById(i).value;
            console.log("quan"+quan);
            const price = (Number(cartList[i].productList[0].pro_price)*quan);
            list.push(price);
            console.log(i);
            console.log("i:"+list[i]);
        }
        console.log(list);
    
        let sumsum = 0;
        list.forEach((item) => {
            sumsum += item;
            console.log(sumsum);
        });
        
        sessionStorage.setItem("order_price", sumsum);

        const element = document.getElementById("totalPrice");
        element.innerHTML = "<div> 총 금액 "+sumsum+"원</div>";
    }
    
    const setQ = async(e) => {
        setQuantity(e.target.value);
        modifyCart(e);
    }

    const modifyCart = async(e) => {
        console.log(e.target.hasAttribute("data-key"));
        totalPrice();
        const formData = new FormData();
        formData.append("user_id", sessionStorage.getItem("user_id"));
        formData.append("pro_code", e.target.getAttribute("data-key"));
        formData.append("quantity", e.target.value);
        console.log("수량 변경================");
        console.log("=="+ e.target.getAttribute("data-key"));
        console.log("=="+e.target.value);

        axios
        .put(`${baseUrl}/cart/modifyCart?user_id=${id}&pro_code=${pro_code}`, formData,
            {headers : {"Content-Type":"multipart/form-data; boundary=${formData._boundary"}})
        .then((response) => {
            history.push(response.data.path);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return(
        <div style={{padding:"20px"}}>
            <div id="wrapper">
                <h1>장바구니</h1>
                <hr />
                <input type="button" value="전체 삭제" onClick={removeAllCart} style={{float:"left"}} />
                <table>
                    <thead>
                        <tr>
                            {/* <th><input type="checkbox" name="allCheck" id="allCheck" />전체 선택</th> */}
                            <th style={{textAlign:"center"}}>상품</th>
                            <th>상품명</th>
                            <th style={{textAlign:"center"}}>수량</th>
                            <th style={{textAlign:"center"}}>가격</th>
                            <th style={{textAlign:"center"}}>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartList.length === 0 ?
                            <tr>
                                <td colSpan="6">
                                    <p style={{textAlign:"center"}}>
                                        <b><span style={{fontSize:"9pt"}}>장바구니에 상품을 담아주세요.</span></b>
                                    </p>
                                </td>
                            </tr>
                            :
                            cartList.map((cart, key) => {
                                return(
                                    <tr key={key}>
                                        {/* <td><input type="checkbox" value={cart.pro_code} /></td> */}
                                        <td style={{textAlign:"center", verticalAlign:"middle", width:"120px", height:"120px"}}><img src={cart.productList[0].pro_img} style={{width:"100px", height:"100px"}} /></td>
                                        <td style={{verticalAlign:"middle"}}>
                                            <Link to={`/shop/view/${cart.pro_code}`} style={{textDecoration:"none"}}>{cart.productList[0].pro_name}</Link>
                                        </td>
                                        <td style={{textAlign:"center", verticalAlign:"middle"}}>
                                            <input type="number" name="quantity" id={key} data-key={cart.pro_code} defaultValue={cart.quantity}
                                                min="1" max={cart.productList[0].pro_available}
                                                onChange={setQ} />
                                        </td>
                                        <td style={{textAlign:"center", verticalAlign:"middle"}}>{(cart.productList[0].pro_price)}</td>
                                        <td style={{textAlign:"center", verticalAlign:"middle"}}>
                                            <input type="button" id="delBtn" data-key={cart.pro_code} value="삭제" onClick={removeCart} style={{width:"45px", height:"40px"}} />                                       </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <div style={{margin:"10px 0 20px 0"}}>
                    <div>{cartList.length}개의 상품</div>
                    <div id="totalPrice"></div>
                </div>

                <Link to="/shop"><button type='button' style={{width:"80px", height:"27px", border:"1px solid darkgray", marginRight:"20px"}}>계속 쇼핑하기</button></Link>
                <input type="button" value="구매하기" onClick={goToCheck} style={{width:"80px", height:"25px", border:"1px solid darkgray"}} />
            </div>
        </div>
    )
}

export default Cart;