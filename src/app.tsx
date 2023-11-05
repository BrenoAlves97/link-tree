import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/home';
import { Admin } from './pages/admin';
import { Login } from './pages/login';
import { Networks } from './pages/networks';
import { Error } from './pages/error';

import { Private } from './routes/private';

export const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/social"
          element={
            <Private>
              <Networks />
            </Private>
          }
        />
        <Route
          path="/admin"
          element={
            <Private>
              <Admin />
            </Private>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </>
);
