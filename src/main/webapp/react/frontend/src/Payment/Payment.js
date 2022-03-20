import axios from "axios";
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { baseUrl } from "../config";

const Payment = ( ) => {

    const history = useHistory();

    const id = sessionStorage.getItem("user_id");
    const code = sessionStorage.getItem("order_code");

    const [memInfomap, setMemInfomap] = useState([]);
    const [addressList, setAddressList] = useState([]);

    useEffect(()=> {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
    }, []);

    useEffect(( ) => {
        axios
        .get(baseUrl + '/order/userInfo', {params:{user_id:id}})
        .then((response) => {
            console.log(response.data);
            setMemInfomap(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const onClickPayment = () => {
        const {IMP} = window;
        IMP.init('imp71688402');

        const name = memInfomap.user_name;
        const tel = memInfomap.phone;
        const email = memInfomap.email;
        const price = sessionStorage.getItem("order_price");
        console.log(price);

        const data = {
            pg: 'html5_inicis',                                     // PG사
            pay_method: 'card',                                     // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`,            // 주문번호
            amount: price,                              // 결제금액
            name: "짜식 결제_"+code,                    // 주문명
            buyer_name: name,                       // 구매자 이름
            buyer_tel: tel,                            // 구매자 전화번호
            buyer_email: email,                         // 구매자 이메일
        };

        IMP.request_pay(data, callback);
    }

    const callback = (response) => {
        const {
            success,
            error_msg,
            imp_uid,
            merchant_uid,
            pay_method,
            status
        } = response;
        
        if (success) {
            axios
            .get(`${baseUrl}/order/payOrder?user_id=${id}&order_code=${code}`)
            .then((response) => {
                alert('결제 성공');
                history.push(response.data.path);
            })
            .catch((error) => {
                console.log(error);
            })
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    }

    return(
        <>
            <button onClick={onClickPayment}>진짜 결제</button>
        </>
    );
}

export default Payment;