import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUrl from './components/CreateUrl';
import UrlList from './components/UrlList';
import RedirectPage from './components/RedirectPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UrlList />} />
          <Route path="/create" element={<CreateUrl />} />
          <Route path="/r/:code" element={<RedirectPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
