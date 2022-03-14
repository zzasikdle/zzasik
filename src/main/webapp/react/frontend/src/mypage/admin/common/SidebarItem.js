import React from "react";

function SidebarItem({menu,isActive}){

  var img_src;

    switch(menu.name){
      case "관리자 페이지": 
       // img_src = '/img/mypage.png';
        break;
      case "공지사항 관리":
      //  img_src = '/img/meal.png';
        break;
      case "고객센터 관리":
       // img_src = '/img/coaching.png';
        break;
      case "상품 관리":
       // img_src = '/img/order.png';
        break;
      case "코칭 서비스 관리":
       // img_src = '/img/cart.png';
        break;
    }
    return isActive === true ? (
        <div className="sidebar-item active">

          <p>{menu.name}</p>
        </div>
      ) : (
        <div className="sidebar-item ">

          <p>{menu.name}</p>
        </div>
      );
}
export default SidebarItem;