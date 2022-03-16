import '../../user/common/Sidebar.css';
import React from "react";
import { Link ,useLocation} from 'react-router-dom';
import SidebarItem from "./SidebarItem";

function Sidebar(){

    const pathName = useLocation().pathname;

    const admin = ["/admin"];
    const notice = ["/admin/notice"];
    const product= ["/admin/product"];
    const lesson = ["/admin/lesson"];

    const menus = [
        { name: "관리자 페이지",path: admin},
        { name: "공지사항 관리",path: notice},
        { name: "상품 관리",path: product},
        { name: "코칭 서비스 관리",path: lesson}
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
                    <Link to={menu.path[0]} key={index} style={{color: "gray", textDecoration: "none"}} activeStyle={{color: "black"}}>
                        <SidebarItem
                            menu={menu}
                            isActive={checkPath(pathName,menu.path)}	// 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
                            />
                    </Link>
                );
            })}
        </div>
    );
}

export default Sidebar;