import '../../user/common/Sidebar.css';
import React from "react";
import { Link ,useLocation} from 'react-router-dom';
import SidebarItem from "./SidebarItem";

function Sidebar(){

    const pathName = useLocation().pathname;

    //마이페이지 
    //나의 코칭 서비스 -> 내가 등록한 코칭 리스트 보여주기, 등록하기(글쓰기) 버튼
    //신청 내역 -> 코칭 서비스 별로 신청 내역 보여주기
    //코칭 하기 -> 코칭 서비스 선택 -> 회원 목록 나옴 -> 회원 선택 -> 글 입력 폼, 회원에게 보낸 글 히스토리


    const menus = [
        { name: "마이페이지",path:"/teacher"},
        { name: "나의 코칭 서비스",path:"/teacher/lesson"},
        { name: "신청 내역",path:"/teacher/signuplist"},
        { name: "코칭 하기",path:"/teacher/coaching"}
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