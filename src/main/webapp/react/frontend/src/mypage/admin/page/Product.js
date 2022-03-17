import ProductList from "../component/ProductList";
/*
상품 관리
기능 : 등록된 상품 모아보기 / 관리하기 버튼(상품 추가,수정,삭제 할수 있는 페이지로 넘어감)
*/
function Product(){
    return (
        <>
           <h1 className="myhome-title">상품 관리</h1>
           <div className='content'>
                <div className="box table-section">
                    {ProductList()}
                </div>
            </div>
        </>
    )
}

export default Product;