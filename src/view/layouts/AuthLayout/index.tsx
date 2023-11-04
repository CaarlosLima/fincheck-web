import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div>
      <h1>Layout</h1>

      <Outlet />
    </div>
  );
}
