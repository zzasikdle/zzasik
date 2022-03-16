import './AdminViewProduct.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../config";

const UserViewProduct = ( ) => {

    const history = useHistory();

    const [product, setProduct] = useState({});
    const {pro_code} = useParams();
    console.log(pro_code);

    const [pro_name, setName] = useState(product.pro_name);
    const [pro_class, setClass] = useState(product.pro_class);
    const [pro_available, setAvail] = useState(product.pro_available);
    const [pro_price, setPrice] = useState(product.pro_price);
    const [pro_detail, setDetail] = useState(product.pro_detail);
    const [pro_img, setImg] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [order_price, setOderPrice] = useState('');
    const [disabled, setDisabled] = useState(true);

    const [image, setImage] = useState('');
    const [order_code, setOrderCode] = useState();

    useEffect(() => {
        async function call() {
            await axios
            .get(baseUrl+'/user/product/viewProduct', {params:{pro_code:pro_code}})
            .then((response)=>{
                console.log(response.data);
                setProduct(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        call();      
    }, []);

    const goToCart = async() => {
        const formData = new FormData();
        formData.append("user_id", sessionStorage.getItem("user_id"));
        formData.append("pro_code", pro_code);
        formData.append("quantity", quantity);

        console.log(sessionStorage.getItem("user_id"));
        console.log(pro_code);
        console.log(quantity);

        await axios
        .post(baseUrl+"/cart/addProduct", formData,
             {headers : {"Content-Type":"multipart/form-data; boundary=${formData._boundary"}})
        .then((response) => {
            console.log(response.data);
            setOrderCode(response.data.order_code);
            alert(response.data.message);
            history.push(response.data.path);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const goToCheck = async( ) => {
        const formData = new FormData();        
        formData.append("user_id", sessionStorage.getItem("user_id"));
        formData.append("pro_code", pro_code);
        formData.append("quantity", quantity);
        formData.append("order_price", (product.pro_price*quantity));
        console.log("=================");
        console.log(sessionStorage.getItem("user_id"));
        console.log(pro_code);
        console.log(quantity);
        console.log(product.pro_price);
        console.log(product.pro_price*quantity);
        console.log("=================");

        await axios
        .post(baseUrl+"/order/addProduct", formData,
              {headers : {"Content-Type":"multipart/form-data; boundary=${formData._boundary"}})
        .then((response) => {
            console.log(response.data.order_code);
            sessionStorage.setItem("order_code", response.data.order_code);
            alert(response.data.message);
            history.push(response.data.path);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const backToList = () => {
        history.push("/shop")
    }

    return (
        <div id="con">
            <h1>user product view</h1>
            <table>
                <tbody>
                    { product.pro_img !== null ?
                        <>
                            <tr id="imagetr">
                                <td>이미지</td>
                                <td>
                                    { product.pro_img !== "undefined" ?
                                        <img src={product.pro_img} alt="preview" style={{width:"300px"}} />
                                        :
                                        <img src='/image/no_image_1.png' />
                                    }
                                </td>
                            </tr>
                        </>
                        : null
                    }
                    
                    <tr>
                        <td style={{ width: "150px", align: "center"}}>상품명</td>
                        <td><input type="text" name="pro_name" value={product.pro_name} disabled={disabled} onChange={(e) => {setName(e.target.value)}} /></td>
                    </tr>
                    <tr> 
                        <td>카테고리</td>
                        <td><input type="text" name="pro_class" value={product.pro_class} disabled={disabled} onChange={(e) => {setClass(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td>가격</td>
                        <td><input type="text" name="pro_price" value={product.pro_price} disabled={disabled} onChange={(e) => {setPrice(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td>수량 선택</td>
                        <td>
                            <input type="number" name="quantity" defaultValue="1" min="1" onChange={(e) => {setQuantity(e.target.value)}} />
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td><textarea rows="10" cols="65" name="pro_detail" value={product.pro_detail} disabled={disabled} onChange={(e) => {setDetail(e.target.value)}}></textarea></td>
                    </tr>

                    <tr id="tr_btn" >
                        <td colSpan="2" style={{ align: "center" }}>
                            <input type="button" value="장바구니 담기" onClick={goToCart} />
                            <input type="button" value="바로 구매" onClick={goToCheck} />
                            <input type="button" value="리스트로 돌아가기" onClick={backToList} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UserViewProduct;