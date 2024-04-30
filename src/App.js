import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavbar from "./Components/MyNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Articlepage from "./Components/Articlepage";
import Authorpage from "./Components/Authorpage";
import Userpage from "./Components/Userpage";
import Searchpage from "./Components/Searchpage";
import Categorypage from "./Components/Categorypage";
import Singlecategory from "./Components/Singlecategory";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Articlepage />} />
          <Route path="/allUsers" element={<Userpage />} />
          <Route path="/authorpage/:id" element={<Authorpage />} />
          <Route path="/search/:id" element={<Searchpage />} />
          <Route path="/category" element={<Categorypage />} />
          <Route path="/singlecategory/:id" element={<Singlecategory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
