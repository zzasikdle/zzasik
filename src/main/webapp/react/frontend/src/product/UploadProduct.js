import './UploadProduct.css';
import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { baseUrl } from "../config";
import FilePreview from "./FilePreview";
import InputFile from "./InputFile";

const UploadProduct = ( ) => {
    const history = useHistory();

    const [pro_name, setName] = useState();
    const [pro_class, setClass] = useState();
    const [pro_available, setAvail] = useState();
    const [pro_price, setPrice] = useState();
    const [pro_detail, setDetail] = useState();
    const [pro_img, setImg] = useState();

    const [image, setImage] = useState('');
    
    const onLoadFile = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    const onDeleteFile = () => {
        URL.revokeObjectURL(image);
        setImage('');
        setImg('');
    };

    const uploadFile = (file) => {
        console.log("file.url : " + file.url);
        setImg(file.url);
    }

    const handleWrite = async( ) => {
        const formData = new FormData();
        formData.append("pro_name", pro_name);
        formData.append("pro_class", pro_class);
        formData.append("pro_available", pro_available);
        formData.append("pro_price", pro_price);
        formData.append("pro_detail", pro_detail);
        formData.append("pro_img", pro_img);
    
        await axios
        .post(baseUrl+'/product/addProduct', formData,
            {headers : {"Content-Type":"multipart/form-data; boundary=${formData._boundary"}})
        .then((response) => {
            alert(response.data.message);
            history.push(response.data.path);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div id="con">
            <h1>상품 등록</h1>
            <hr />
            <table>
                <tbody>
                    <tr>
                        <td>상품 이미지</td>
                    </tr>
                    <tr id="imagetr">
                        <td style={{width:"400px", height:"400px", border:"3px solid gray"}}><FilePreview image={image} style={{margin:"0 auto"}} /></td>
                        <td><InputFile name="pro_img" onLoadFile={onLoadFile} onFileChange={uploadFile} /></td>
                        <td><input type="button" value="삭제하기" onClick={onDeleteFile} /></td>
                    </tr>
                    <tr>
                        <td className='title'>상품명</td>
                        <td><input type="text" name="pro_name" onChange={(e) => {setName(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td className='title'>카테고리</td>
                        <td><input type="text" name="pro_class" onChange={(e) => {setClass(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td className='title'>가격</td>
                        <td><input type="text" name="pro_price" onChange={(e) => {setPrice(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td className='title'>수량</td>
                        <td><input type="text" name="pro_available" onChange={(e) => {setAvail(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td className='title' style={{position:"relative", top:"-250px"}}>소개</td>
                        <td><textarea rows="10" cols="65" name="pro_detail" onChange={(e) => {setDetail(e.target.value)}}></textarea></td>
                    </tr>
                    <tr>
                        <td>
                            <Link to="/product" onClick={handleWrite}>글쓰기</Link>
                            <Link to="/product">취소</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UploadProduct;