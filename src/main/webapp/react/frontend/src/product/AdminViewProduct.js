/*eslint-disable*/


import './AdminViewProduct.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../config";

import FilePreview from "./FilePreview";
import InputFile from "./InputFile";

const AdminViewProduct = ( ) => {

    const history = useHistory();

    const [product, setProduct] = useState({});
    const {pro_code} = useParams();

    const [pro_name, setName] = useState(product.pro_name);
    const [pro_class, setClass] = useState(product.pro_class);
    const [pro_available, setAvail] = useState(product.pro_available);
    const [pro_price, setPrice] = useState(product.pro_price);
    const [pro_detail, setDetail] = useState(product.pro_detail);
    const [pro_img, setImg] = useState('');
    const [disabled, setDisabled] = useState(true);

    const [image, setImage] = useState('');
    
    const onLoadFile = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    const onDeleteFile = () => {
        URL.revokeObjectURL(image);
        setImage('');
    };

    const uploadFile = (file) => {
        console.log("file.url : " + file.url);
        setImg(file.url);
    }

    useEffect(() => {
        async function call() {
            await axios
            .get(baseUrl+'/admin/product/viewProduct', {params:{pro_code:pro_code}})
            .then((response)=>{
                setProduct(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        call();      
    }, []);

    const fn_enable = () => {
        setDisabled(false);
        document.getElementById("tr_btn_modify").style.display="block";
        if(document.getElementById("tr_file_upload") != null)
            document.getElementById("tr_file_upload").style.display="block";
        document.getElementById("tr_btn").style.display="none";
    }

    const fn_modify = async() => {
        const formData = new FormData();
        formData.append("pro_name", pro_name);
        formData.append("pro_class", pro_class);
        formData.append("pro_available", pro_available);
        formData.append("pro_price", pro_price);
        formData.append("pro_detail", pro_detail);
        formData.append("pro_img", pro_img);

        setDisabled(true);

        await axios
        .put(`${baseUrl}/product/modifyProduct?pro_code=${pro_code}`, formData,
            {headers : {"Content-Type":"multipart/form-data; boundary=${formData._boundary"}})
        .then((response) => {
            alert(response.data.message);
            history.push(response.data.path);
        })
        .catch((error) => {
            console.log(error);
        })

        document.getElementById("tr_btn_modify").style.display="none";
        document.getElementById("tr_btn").style.display="block";
    }

    const fn_remove = async() => {
        await axios
        .delete(`${baseUrl}/product/removeProduct?pro_code=${pro_code}`)
        .then((response) => {
            alert(response.data.message);
            history.push(response.data.path);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const backToList = () => {
        history.push("/product")
    }

    return (
        <div id="con">
            <h1>상품 관리</h1>
            <table>
                <tbody>
                    {console.log("dd:" + (product.pro_img !== undefined && product.pro_img !== null))}
                    { product.pro_img !== null ?
                        <>
                            <tr id="imagetr">
                                <td>이미지</td>
                                <td>
                                    { product.pro_img !== undefined ?
                                        <img src={product.pro_img} alt="preview" className='image' />
                                        :
                                        <p>이미지가 없습니다.</p>
                                    }
                                </td>
                            </tr>
                        </>
                        :
                        <>
                            <tr id="tr_file_upload">
                                <td>이미지</td>
                                <td><InputFile name="pro_img" disabled={disabled} onLoadFile={onLoadFile} onFileChange={uploadFile} /></td>
                                <td><FilePreview image={image} /></td>
                                <td><input type="button" value="삭제하기" onClick={onDeleteFile} /></td>
                            </tr>
                        </>
                    }
                    
                    <tr>
                        <td style={{height:"10px"}}>
                            <input type="hidden" name="pro_code" value={product.pro_code} />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: "150px", align: "center" }}>상품명</td>
                        <td><input type="text" name="pro_name" defaultValue={product.pro_name} disabled={disabled} onChange={(e) => {setName(e.target.value)}} /></td>
                    </tr>
                    <tr> 
                        <td>카테고리</td>
                        <td><input type="text" name="pro_class" defaultValue={product.pro_class} disabled={disabled} onChange={(e) => {setClass(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td>수량</td>
                        <td><input type="text" name="pro_available" defaultValue={product.pro_available} disabled={disabled} onChange={(e) => {setAvail(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td>가격</td>
                        <td><input type="text" name="pro_price" defaultValue={product.pro_price} disabled={disabled} onChange={(e) => {setPrice(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td><textarea rows="10" cols="65" name="pro_detail" defaultValue={product.pro_detail} disabled={disabled} onChange={(e) => {setDetail(e.target.value)}}></textarea></td>
                    </tr>
                    <tr id="tr_btn_modify" style={{ width: "150px" }} >
                        <td></td>
                        <td>
                            <input type="button" value="수정반영하기" onClick={fn_modify} />
                            <input type="button" value="취소" onClick={backToList} />
                        </td>
                    </tr>

                    <tr id="tr_btn" >
                        <td colSpan="2" style={{ align: "center" }}>
                               	<input type="button" value="수정하기" onClick={fn_enable} style={{marginRight:"20px", border:"1px solid darkgray"}} />
                                <input type="button" value="삭제하기" onClick={fn_remove} style={{marginRight:"20px", border:"1px solid darkgray"}} />
                            	<input type="button" value="리스트로 돌아가기" onClick={backToList} style={{marginRight:"20px", border:"1px solid darkgray"}} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AdminViewProduct;