import './AdminViewProduct.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../config";
import { useHistory } from 'react-router-dom';

const UserViewProduct = ( ) => {

    const history = useHistory();

    const [product, setProduct] = useState({});
    const {pro_code} = useParams();

    //user_id = sessionStorage.getItem("user_id");
    const {user_id} = useParams();

    const [pro_name, setName] = useState(product.pro_name);
    const [pro_class, setClass] = useState(product.pro_class);
    const [pro_available, setAvail] = useState(product.pro_available);
    const [pro_price, setPrice] = useState(product.pro_price);
    const [pro_detail, setDetail] = useState(product.pro_detail);
    const [pro_img, setImg] = useState('');
    const [quantity, setQuantity] = useState('');
    const [disabled, setDisabled] = useState(true);

    const [image, setImage] = useState('');

    useEffect(() => {
        async function call() {
            await axios
            .get(baseUrl+'/user/product/viewProduct', {params:{pro_code:pro_code}})
            .then((response)=>{
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
        formData.append("pro_name", pro_name);
        formData.append("pro_class", pro_class);
        formData.append("pro_price", pro_price);
        formData.append("pro_img", pro_img);
        formData.append("quantity", quantity);
        formData.append("user_id", sessionStorage.getItem("user_id"));

        await axios
        .post(baseUrl+"/user/cart", formData,
             {headers : {"Content-Type":"multipart/form-data; boundary=${formData._boundary"}})
        .then((response) => {
            alert(response.data.message);
            history.push(response.data.path);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const orderProduct = () => {
        history.push("/")
    }

    const backToList = () => {
        history.push("/shop/product")
    }

    const plus = ( ) => {

    }

    const minus = ( ) => {

    }

    return (
        <div>
            <h1>user product view</h1>
            <table>
                <tbody>
                    { product.pro_img !== null ?
                        <>
                            <tr>
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
                        <td><input type="text" name="pro_name" defaultValue={product.pro_name} disabled={disabled} onChange={(e) => {setName(e.target.value)}} /></td>
                    </tr>
                    <tr> 
                        <td>카테고리</td>
                        <td><input type="text" name="pro_class" defaultValue={product.pro_class} disabled={disabled} onChange={(e) => {setClass(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td>가격</td>
                        <td><input type="text" name="pro_price" defaultValue={product.pro_price} disabled={disabled} onChange={(e) => {setPrice(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td>
                            <input type="button" onClick={minus} value="-" />
                            <input type="number" name="quantity" defaultValue="1" />
                            <input type="button" onClick={plus} value="+" />
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td><textarea rows="10" cols="65" name="pro_detail" defaultValue={product.pro_detail} disabled={disabled} onChange={(e) => {setDetail(e.target.value)}}></textarea></td>
                    </tr>

                    <tr id="tr_btn" >
                        <td colSpan="2" style={{ align: "center" }}>
                            <input type="button" value="장바구니 담기" onClick={goToCart} />
                            <input type="button" value="바로 구매" onClick={orderProduct} />
                            <input type="button" value="리스트로 돌아가기" onClick={backToList} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UserViewProduct;