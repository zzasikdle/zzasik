import { useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import Pagination from "../../../components/notice/Pagination";
import { baseUrl } from "../../../config";

const ProductList = () => {
    const [ productList,setProductList] = useState([]);
    const limit = 10;    //한 페이지당 표시할 게시물 개수
    const [ page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    useEffect(()=>{
        axios
        .get(baseUrl+'/product/listProducts')
        .then((response)=>{
            console.log(response.data);
            setProductList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);

    

    return (
        <div className="box table-section">
            <div className="box_header">
                <h2>상품 목록</h2>
                <Link to='/product' className='manage'>관리하기<img className="arrow" src='/img/arrow.png' alt=">"/></Link>
            </div>
            <table class="tb" style={{cellspacing:"0",border:"1"}}>
                <colgroup>
                    <col width="40"/>
                    <col width="120"/>
                    <col width="90"/>
                    <col width="40"/>
                    <col width="90"/>
                    <col width="40"/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">상품 번호</th>
                        <th scope="col">상품명</th>
                        <th scope="col">분류</th>
                        <th scope="col">재고수량</th>
                        <th scope="col">상품 가격</th>
                        <th scope="col">상품 조회수</th>
                    </tr>
                </thead>

                <tbody>
                    {productList.length===0 ?
                    <tr height="10">
                        <td colSpan="6">
                            <p style={{align:"center"}}>
                                <b><span style={{fontSize:"9pt"}}>등록된 상품이 없습니다.</span></b>
                            </p></td>
                    </tr>
                    :
                    productList.slice(offset, offset + limit).map((product,key) => {
                        return(
                            <tr>
                                <td>{product.pro_code}</td>
                                <td><Link to={`/product/view/${product.pro_code}`}>{product.pro_name}</Link></td>
                                <td>{product.pro_class}</td>
                                <td>{product.pro_available}</td>
                                <td>{product.pro_price}</td>
                                <td>{product.pro_count}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <footer>
            <Pagination
                total={productList.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />
            </footer>
        </div>
    )
}

export default ProductList;