import './App.css';

import Header from './component/common/Header';
import Home from './home';
import Login from './component/member/Login';
import Side from './component/common/Side';
import Footer from './component/common/Footer';
import WriteBoard from './component/board/writeboard';
import BoardList from './component/board/boardList';
import ViewBoard from './component/board/viewboard';


import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Join from './component/member/Join';





function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <div id='container'>
          <Header />
          <Side />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/member/login" element={<Login />} />
              <Route path="/member/join" element={<Join />} />
              <Route path="/writeboard" element={<WriteBoard />} />
              <Route path="/board/list" element={ < BoardList />} />
              <Route path="/board/viewboard/:board_code" element={ <ViewBoard />} />
              
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;