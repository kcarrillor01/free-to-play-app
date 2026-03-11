import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { GameDetail } from "../../shared/types/api.types";
import { useNavigate, useParams } from "react-router";
import { gameDetailService } from "./services/gameDetailService";

const GameDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [game, setGame] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID de juego inválido");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await gameDetailService.getGameById(id);
        setGame(data);
      } catch (e) {
        console.error("GameDetail load error:", e);
        const msg = e instanceof Error ? e.message : "Error cargando detalle";
        setError(msg);
        toast.error("No se pudo cargar el detalle del juego");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Cargando juego...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">{error}</div>
        <div>
          <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (!game) {
    return null;
  }

  return (
    <div className="container py-4">
      <div className="mb-3">
        <button className="btn btn-link" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm">
            <img src={game.thumbnail} alt={game.title} className="card-img-top" />
            <div className="card-body">
              <h3 className="card-title">{game.title}</h3>

              <div className="mb-2">
                <span className="badge badge-genre me-2">{game.genre}</span>
                <span className="badge bg-primary">{game.platform}</span>
              </div>

              <p className="text-muted small mb-1">
                {game.release_date} • {game.publisher}
              </p>

              <div className="d-grid gap-2 mt-3">
                <a
                  href={game.game_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-success"
                >
                  Jugar / Descargar
                </a>
                <a
                  href={game.freetogame_profile_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-secondary"
                >
                  Perfil en FreeToGame
                </a>
              </div>
            </div>
          </div>

          {/* Minimum requirements */}
          {game.minimum_system_requirements && (
            <div className="card mt-3">
              <div className="card-body">
                <h5>Requisitos mínimos</h5>
                <ul className="mb-0">
                  <li><strong>OS:</strong> {game.minimum_system_requirements.os}</li>
                  <li><strong>Processor:</strong> {game.minimum_system_requirements.processor}</li>
                  <li><strong>Memory:</strong> {game.minimum_system_requirements.memory}</li>
                  <li><strong>Graphics:</strong> {game.minimum_system_requirements.graphics}</li>
                  <li><strong>Storage:</strong> {game.minimum_system_requirements.storage}</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="col-12 col-md-8">
          <h4>Descripción</h4>
          <p>{game.description}</p>

          {/* Screenshots */}
          {game.screenshots && game.screenshots.length > 0 && (
            <>
              <h5 className="mt-4">Screenshots</h5>

              <div className="row g-2">
                {game.screenshots.map((s) => (
                  <div key={s.id} className="col-6 col-md-4">
                    <img src={s.image} alt={`screenshot-${s.id}`} className="img-fluid rounded" />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;