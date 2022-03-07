import React from "react";

function SidebarItem({menu,isActive}){

  var img_src;

    switch(menu.name){
      case "마이페이지": 
        img_src = '/img/mypage.png';
        break;
      case "나의 식단":
        img_src = '/img/meal.png';
        break;
      case "나의 코칭 서비스":
        img_src = '/img/coaching.png';
        break;
      case "주문내역":
        img_src = '/img/order.png';
        break;
      case "장바구니":
        img_src = '/img/cart.png';
        break;
    }
    return isActive === true ? (
        <div className="sidebar-item active">
          <img src={img_src}/>
          <p>{menu.name}</p>
        </div>
      ) : (
        <div className="sidebar-item ">
          <img src={img_src}/>
          <p>{menu.name}</p>
        </div>
      );
}
export default SidebarItem;