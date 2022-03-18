import React from "react";

function SidebarItem({menu,isActive}){

    switch(menu.name){
      case "관리자 페이지": 
        break;
      case "공지사항 관리":
        break;
      case "상품 관리":
        break;
      case "코칭 서비스 관리":
        break;
      default:
        break;
    }
    return isActive === true ? (
        <div className="sidebar-item active">

          <p style={{color:"#3F497A",fontWeight:550}}>{menu.name}</p>
        </div>
      ) : (
        <div className="sidebar-item ">

          <p>{menu.name}</p>
        </div>
      );
}
export default SidebarItem;