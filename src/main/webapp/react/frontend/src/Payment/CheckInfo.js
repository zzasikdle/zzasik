/*eslint-disable*/


import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { baseUrl } from "../config";

const CheckInfo = ( ) => {

    const history = useHistory();

    const [ memInfomap, setMemInfomap ] = useState([]);
    const [ addressList, setAddressList ] = useState({});

    const id = sessionStorage.getItem("user_id");
    const code = sessionStorage.getItem("order_code");

    useEffect(( ) => {
        axios
        .get(baseUrl + '/order/userInfo', {params:{user_id:id}})
        .then((response) => {
            console.log(response.data);
            setMemInfomap(response.data);
            console.log(response.data.addressList[0]);
            setAddressList(response.data.addressList[0]);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const removeOrder = async() => {
        await axios
        .delete(`${baseUrl}/order/removeOrder?order_code=${code}`)
        .then((response) => {
			alert(response.data.message);
            history.push(response.data.path);
        })
        .catch((error) => {
            console.log(error);
        })
    }


    return(
        <>
        <div>
            <h1>구매자 정보</h1>
            <table>
                <tbody>
                    <tr>
                        <td>이름</td>
                        <td>{memInfomap.user_name}</td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>{memInfomap.email}</td>
                    </tr>
                    <tr>
                        <td>휴대폰 번호</td>
                        <td>{memInfomap.phone}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div>
            <h1>받는 사람 정보</h1>
            <input type="button" value="배송지 변경" />
            <table>
                <tbody>
                    <tr>
                        <td>이름</td>
                        <td>{addressList.addr_receiver}</td>
                    </tr>
                    <tr>
                        <td>배송 주소</td>
                        <td>{addressList.addr_2} {addressList.addr_3}</td>
                    </tr>
                    <tr>
                        <td>연락처</td>
                        <td>{addressList.addr_phone}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Link to="/" onClick={removeOrder}>취소</Link>
        <Link to="/order/pay">다음</Link>
        </>
    )
}

export default CheckInfo;