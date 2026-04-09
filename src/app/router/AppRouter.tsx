import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import GamesMainPage from "../../features/games/GamesMainPage";
import Navbar from "../../shared/components/Navbar";
import GameDetailPage from "../../features/gameDetail/GameDetailPage";
import NotFoundPage from "../../features/notFoundPage/NotFoundpage";
import Login from "../../features/auth/components/Login";
import Register from "../../features/auth/components/Register";
import UserProfile from "../../features/auth/components/UserProfile";
import ProtectedRoute from "../../shared/components/ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<GamesMainPage />} />

        {/* Games */}
        <Route path="/games" element={<GamesMainPage />} />

        {/* Dynamic route */}
        <Route path="/games/:id" element={<GameDetailPage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />

        {/* Redirect unknown routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;