import Cart from "../../../product/Cart";
function MyCart(){
    return (
        <>
           <h1 className="myhome-title">장바구니</h1>
           <div className='content'>
                <div className="box table-section">
                    {Cart()}
                </div>
            </div>
        </>
    )
}

export default MyCart;
