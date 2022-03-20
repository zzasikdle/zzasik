/*eslint-disable*/


import './ProductList.css';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../config'
import { useHistory } from 'react-router-dom';

const UserProductList = ( ) => {

    const [ productList, setProductList ] = useState([]);

    useEffect(( ) => {
        axios
        .get(baseUrl + '/product/listProducts')
        .then((response) => {
            console.log(response.data);
            setProductList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <div id="con">
            <h1 style={{textAlign:"center"}}>짜식 상품 shop</h1>
            <hr />
            <div id="wrapper">
                {productList.length === 0 ?
                <div>
                    <p style={{textAlign:"center"}}>
                        <b><span style={{fontSize:"9pt"}}></span></b>
                    </p>
                    등록된 글이 없습니다.
                </div>
                :
                productList.map((product, key) => {
                    return(
						<ul id="productul" style={{margin:"0 auto"}}>
                        <li id="productli" style={{textAlign:"center"}} key={key}>
                            <Link to={`/shop/view/${product.pro_code}`} style={{textDecoration:"none"}}>
                                <div>
                                    { product.pro_img !== "undefined" ?
                                        <img src={product.pro_img} className='image' />
                                    :
                                        <img src="/image/no_image_1.png" className='image' />
                                    }
                                </div>                                
                                <div style={{color:"black"}}>{product.pro_name}</div>
                                <div style={{fontSize:"20px", fontWeight:"bold", color:"firebrick"}}>{product.pro_price}</div>
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

export default UserProductList;