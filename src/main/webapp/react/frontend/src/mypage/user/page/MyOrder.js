import OrderList from "../../../Payment/OrderList";

export default function MyOrder(){
    return (
        <>
           <h1 className="myhome-title">주문내역</h1>
           <div className='content'>
                <div className="box table-section">
                    {OrderList()}
                </div>
            </div>
        </>
    );
}
