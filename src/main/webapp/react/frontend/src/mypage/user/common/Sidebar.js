import './Sidebar.css';
import React from "react";
import { Link ,useLocation} from 'react-router-dom';
import SidebarItem from "./SidebarItem";

function Sidebar(){

    const pathName = useLocation().pathname;

    const menus = [
        { name: "마이페이지",path:"/myhome"},
        { name: "나의 식단",path:"/myhome/myDiet"},
        { name: "나의 코칭 서비스",path:"/myhome/myLesson"},
        { name: "주문내역",path:"/myhome/myOrder"},
        { name: "장바구니",path:"/myhome/myCart"}
    ];

    return(
        <div className="sidebar">
            {menus.map((menu,index) => {
                return (
                    <>
                    <Link to={menu.path} key={index} style={{color: "gray", textDecoration: "none"}} activeStyle={{color: "black"}}>
                        <SidebarItem
                            menu={menu}
                            isActive={pathName === menu.path ? true : false}	// 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
                            />
                    </Link>
                    </>
                );
            })}
        </div>
    );
}

export default Sidebar;