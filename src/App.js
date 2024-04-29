import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbartop from "./Components/Navbartop";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Articlepage from "./Pages/Articlepage";
import Authorpage from "./Pages/Authorpage";
import Userpage from "./Pages/Userpage";
import Searchpage from "./Pages/Searchpage";
import Categorypage from "./Pages/Categorypage";
import Singlecategorypage from "./Pages/Singlecategorypage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbartop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/article/:id" element={<Articlepage />} />
          <Route path="/allUsers" element={<Userpage />} />
          <Route path="/authorpage/:id" element={<Authorpage />} />
          <Route path="/search/:id" element={<Searchpage />} />
          <Route path="/category" element={<Categorypage />} />
          <Route path="/singlecategory/:id" element={<Singlecategorypage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
