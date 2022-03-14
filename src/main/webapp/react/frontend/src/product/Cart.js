const Cart = () => {
    return(
        <div>
            <h1>장바구니</h1>
            <table>
                <tbody>
                    <tr><input type="checkbox" name="product" value={product.pro_code} /></tr>
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
                </tbody>
            </table>
        </div>
    )
}

export default Cart;