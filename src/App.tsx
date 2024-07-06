// src/App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login.tsx';
import ProtectedRoutes from './protectedRoutes.tsx';
import SecondPage from './components/secondPage.tsx';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<ProtectedRoutes />} >
          <Route path='/data' element={<SecondPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
