import './ProductList.css';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../config'
import { useHistory } from 'react-router-dom';

const UserProductList = ( ) => {

    const [ productList, setProductList ] = useState([]);

    const history = useHistory();

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

    let result = [];

    return (
        <div>
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
                        <ul id="productul" style={{float:"left"}}>
                        <li id="productli" style={{textAlign:"center"}} key={key}>
                            <Link to={`/shop/product/view/${product.pro_code}`} style={{textDecoration:"none"}}>
                                <div>
                                    { product.pro_img !== "undefined" ?
                                        <img src={product.pro_img} />
                                    :
                                        <img src="/image/no_image_1.png" />
                                    }
                                </div>                                
                                <div>{product.pro_name}</div>
                                <div>{product.pro_price}</div>
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