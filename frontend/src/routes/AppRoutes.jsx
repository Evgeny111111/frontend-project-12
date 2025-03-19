import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import HomePage from '../pages/HomePage';
import ProtectedRoute from './ProtectedRoute';
import routes from './routes';

const AppRoutes = () => (
  <Routes>
    <Route
      path={routes.home}
      element={(
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      )}
    />
    <Route path={routes.login} element={<LoginPage />} />
    <Route path={routes.signup} element={<SignupPage />} />
    <Route path={routes.notFound} element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
