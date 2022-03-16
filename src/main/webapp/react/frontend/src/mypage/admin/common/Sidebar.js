import '../../user/common/Sidebar.css';
import React from "react";
import { Link ,useLocation} from 'react-router-dom';
import SidebarItem from "./SidebarItem";

function Sidebar(){

    const pathName = useLocation().pathname;

    const menus = [
        { name: "관리자 페이지",path:"/admin"},
        { name: "공지사항 관리",path:"/admin/notice"},
        { name: "상품 관리",path:"/admin/product"},
        { name: "코칭 서비스 관리",path:"/admin/lesson"}
    ];

    return(
        <div className="sidebar">
            {menus.map((menu,index) => {
                return (
                    <Link to={menu.path} key={index} style={{color: "gray", textDecoration: "none"}} activeStyle={{color: "black"}}>
                        <SidebarItem
                            menu={menu}
                            isActive={pathName === menu.path ? true : false}	// 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
                            />
                    </Link>
                );
            })}
        </div>
    );
}

export default Sidebar;