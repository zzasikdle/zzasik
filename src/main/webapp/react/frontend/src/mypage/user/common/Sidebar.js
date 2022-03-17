import './Sidebar.css';
import React from "react";
import { Link ,useLocation} from 'react-router-dom';
import SidebarItem from "./SidebarItem";

function Sidebar(){

    const user_name = sessionStorage.getItem("user_name");
    const pathName = useLocation().pathname;

    const myPage = ["/myhome","/myhome/edit","/myhome/myAddress","/myhome/addAddress","/myhome/updateAddress/"+user_name];
    const myDiet = ["/myhome/myDiet"];
    const myLesson = ["/myhome/myLesson"];
    const myOrder = ["/myhome/myOrder"];
    const myCart = ["/myhome/myCart"];

    const menus = [
        { name: "마이페이지",path: myPage},
        { name: "나의 식단",path: myDiet},
        { name: "나의 코칭 서비스",path: myLesson},
        { name: "주문내역",path: myOrder},
        { name: "장바구니",path: myCart}
    ];

    const checkPath = (pathName,path) => {
        for(var i = 0; i < path.length; i++)
            if(pathName === path[i]) return true; 
        
        return false;
    }

    return(
        <div className="sidebar">
            {menus.map((menu,index) => {
                return (
                    <>
                    <Link to={menu.path[0]} key={index} style={{color: "gray", textDecoration: "none"}} activeStyle={{color: "black"}}>
                        <SidebarItem
                            menu={menu}
                            isActive={checkPath(pathName,menu.path)}	// 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
                            />
                    </Link>
                    </>
                );
            })}
        </div>
    );
}

export default Sidebar;