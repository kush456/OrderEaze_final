// import { Intro } from "./Pages/Intro";
import React from "react";
import { Landing } from "./Pages/Landing.jsx";
import Register from "./Pages/Register.jsx";
import Login  from "./Pages/Login.jsx";
import {MyBasket}  from "./Pages/MyBasket.jsx";
import MenuPage from "./Pages/Menupage.jsx";
import History from "./Pages/History.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VerificationPage from "./Pages/VerificationPage .jsx";
import TableInput from "./Pages/Tableinput.jsx";
import Menu from "./Pages/Menu.jsx";
import PaymentsPage from "./Pages/PaymentsPage.jsx";
import FeedbackPage from "./Pages/FeedbackPage.jsx";
import OrderTracking from "./Pages/OrderTracking.jsx";


export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/Menu" element={<MenuPage />}></Route>
          <Route path="/Table" element={<TableInput />}></Route>
          <Route path="/menu2" element={<Menu />}></Route>
          <Route path="/mybasket" element={< MyBasket/>}></Route>
          <Route path="/history" element={< History/>}></Route>
          <Route path="/payment" element={< PaymentsPage/>}></Route>
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/status" element={<OrderTracking/>} />
          
        </Routes>
      </Router>
      {/* <Intro/> */}
      {/* <Login/> */}
      {/* <MyBasket/> */}
      {/*  */}
      {/* <Signin /> */}
    </>
  );
}
