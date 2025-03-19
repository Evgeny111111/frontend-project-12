import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import HomePage from '../pages/HomePage';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from './routes';

const AppRoutes = () => (
  <Routes>
    <Route
      path={ROUTES.home}
      element={(
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      )}
    />
    <Route path={ROUTES.login} element={<LoginPage />} />
    <Route path={ROUTES.signup} element={<SignupPage />} />
    <Route path={ROUTES.notFound} element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
