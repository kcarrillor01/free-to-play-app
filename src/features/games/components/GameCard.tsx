import { Link } from "react-router";
import type { Game } from "../../../shared/types/api.types";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Link
      to={`/games/${game.id}`}
      className="text-decoration-none text-dark"
    >
      <div className="card h-100 shadow-sm hover-card">

        <img
          src={game.thumbnail}
          alt={game.title}
          className="card-img-top"
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title">
            {game.title}
          </h5>

          <p className="card-text flex-grow-1">
            {game.short_description}
          </p>

          <div className="d-flex justify-content-between align-items-center">

            <span
              className="badge text-white"
              style={{ backgroundColor: "#ff7a18" }}
            >
              {game.genre}
            </span>

            <small className="text-muted">
              {game.platform}
            </small>

          </div>

        </div>
      </div>
    </Link>
  );
};

export default GameCard;