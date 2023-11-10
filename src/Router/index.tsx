import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthLayout } from 'src/view/layouts/AuthLayout';
import { Dashboard } from 'src/view/pages/Dashboard';
import { Login } from 'src/view/pages/Login';
import { Register } from 'src/view/pages/Register';

import { AuthGuard } from './AuthGuard';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
