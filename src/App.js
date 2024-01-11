import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Component1 from './Components/Component1/Component1';
import Component2 from './Components/Component2/Component2';
import Component3 from './Components/Component3/Component3';

const App = () => {
  return (
    <Router>
      <div>
        {/* <h1>Main Application</h1> */}
        <NavBar />
        <Routes>
          <Route path="/component1" element={<Component1 />} />
          <Route path="/component2" element={<Component2 />} />
          <Route path="/component3" element={<Component3 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
