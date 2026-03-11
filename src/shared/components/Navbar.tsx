import React from "react";
import { useGamesStore } from "../../features/games/stores/gamesStore";
import { Link } from "react-router";

const Navbar: React.FC = () => {

  // Valor actual del buscador desde Zustand
  const search = useGamesStore((s) => s.search);
  const setSearch = useGamesStore((s) => s.setSearch);

  const totalGames = useGamesStore((s) => s.filteredGames.length);

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top shadow-sm"
      style={{
        background: "linear-gradient(90deg, #0d6efd 0%, #ff7a18 100%)"
      }}
    >
      <div className="container">

        {/* Logo + Brand */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2 text-white fw-bold"
          to="/"
        >
          <img
            src="/logo-control.svg"
            alt="PixelArena Logo"
            height="30"
          />
          PixelArena
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="mainNav">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/games"
              >
                Juegos
              </Link>
            </li>
          </ul>

          {/* Right side */}
          <div className="d-flex align-items-center gap-3">

            {/* Buscador */}
            <div className="input-group input-group-sm">
              <input
                type="search"
                className="form-control"
                placeholder="Buscar juego..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="input-group-text bg-white">
                🔎
              </span>
            </div>

            {/* Total de juegos */}
            <span className="badge bg-dark">
              {totalGames} juegos
            </span>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;