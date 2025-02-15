import React from 'react';
import './App.css';

import Home from  './components/Home'
import Comparator from './components/Comparator'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComparisonPage from './components/ComparisonPage';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comparator" element={<Comparator />} />
        <Route path="/comparison" element={<ComparisonPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
