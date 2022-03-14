import React from "react";

function SidebarItem({menu,isActive}){

  var img_src;

    switch(menu.name){
      case "마이페이지": 
        if(isActive) img_src = '/img/mypage_active.png';
        else img_src = '/img/mypage.png';
        break;
      case "나의 식단":
        if(isActive) img_src ='/img/meal_active.png';
        else img_src = '/img/meal.png';
        break;
      case "나의 코칭 서비스":
        if(isActive) img_src ='/img/coaching_active.png';
        else img_src = '/img/coaching.png';
        break;
      case "주문내역":
        if(isActive) img_src ='/img/order_active.png';
        else img_src = '/img/order.png';
        break;
      case "장바구니":
        if(isActive) img_src ='/img/cart_active.png';
        else img_src = '/img/cart.png';
        break;
    }
    return isActive === true ? (
        <div className="sidebar-item active">
          <img src={img_src}/>
          <p style={{color:"#2374FA"}}>{menu.name}</p>
        </div>
      ) : (
        <div className="sidebar-item ">
          <img src={img_src}/>
          <p>{menu.name}</p>
        </div>
      );
}
export default SidebarItem;