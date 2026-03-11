import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import GamesMainPage from "../../features/games/GamesMainPage";
import Navbar from "../../shared/components/Navbar";
import GameDetailPage from "../../features/gameDetail/GameDetailPage";
import NotFoundPage from "../../features/notFoundPage/NotFoundpage";


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

        {/* Redirect unknown routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;