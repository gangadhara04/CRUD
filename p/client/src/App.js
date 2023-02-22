import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Navbar from "./components/Create";
import RecordList from "./components/RecordList";
import Remove from "./components/Remove";

const App = () => {
  return (
    <div>
      <Navbar />
      
      <Routes>
      <Route path="/" element=<RecordList/>/>
        <Route path="/edit/:id" element=<Edit /> />

        <Route path="/create" element={<Create />} />

        <Route path="remove/:id" element={<Remove />} />
      </Routes>
    </div>
  );
};

export default App;
