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

    const mypage = ["/teacher","/myhome/edit","/myhome/myAddress","/myhome/addAddress"];
    const lesson = ["/teacher/lesson"];
    const signuplist= ["/teacher/signuplist"];
    const coaching = ["/teacher/coaching","/teacher/coachingform"];

    const menus = [
        { name: "마이페이지",path:mypage},
        { name: "나의 코칭 서비스",path:lesson},
        { name: "신청 내역",path:signuplist},
        { name: "코칭 하기",path:coaching}
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