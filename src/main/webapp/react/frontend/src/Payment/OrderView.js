/*eslint-disable*/


import './App.css';
import React from 'react';

import Home from './Home';
import AdminProductList from './product/AdminProductList';
import UserProductList from './product/UserProductList';
import UploadProduct from './product/UploadProduct';
import AdminViewProduct from './product/AdminViewProduct';
import UserViewProduct from './product/UserViewProduct';
import Cart from './product/Cart';
import Login from './member/Login';
import Join from './member/Join';
import CheckInfo from './Payment/CheckInfo';
import PayOrder from './Payment/PayOrder';
import OrderList from './Payment/OrderList';
import Payment from './Payment/Payment.js';
import OrderView from './Payment/OrderView.js';

import { Route, Routes, BrowserRouter } from 'react-router-dom';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <div id="container">
          <div>
              <Route exact path="/"><Home /></Route>
              <Route path="/login" component={Login} />
              <Route path="/member/join" component={Join} />
              <Route exact path="/admin/product" component={AdminProductList} />
              <Route exact path="/admin/product/new" component={UploadProduct} />
              <Route exact path="/admin/product/view/:pro_code" component={AdminViewProduct} />
              <Route exact path="/shop/product" component={UserProductList} />
              <Route exact path="/shop/product/view/:pro_code" component={UserViewProduct} />
              <Route path="/user/cart" component={Cart} />
              <Route exact path="/order/check" component={CheckInfo} />
              <Route exact path="/order/pay" component={PayOrder} />
              <Route exact path="/order/list" component={OrderList} />
              <Route exact path="/order/view/:order_code" component={OrderView} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;