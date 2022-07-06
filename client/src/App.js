import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './views/Dashboard';
import Detail from './views/Detail';
import Update from './views/Update';
import Create from './views/Create';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Dashboard />} path='/' />
          <Route element={<Create />} path='/people/create' />
          <Route element={<Detail />} path='/people/:id' />
          <Route element={<Update />} path='/people/:id/edit' />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
