import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AadharCheck from './AadharCheck';
import Vote from './Vote';
import VoteCount from './VoteCount';
import Navbar from './Navbar';

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aadhar-check" element={<AadharCheck />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/vote-count" element={<VoteCount />} />
      </Routes>
    </div>
  </Router>
);

export default App;
