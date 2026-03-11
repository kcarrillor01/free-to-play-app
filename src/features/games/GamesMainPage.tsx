import { useSearchParams } from "react-router";
import { useGamesStore } from "./stores/gamesStore";
import { useGames } from "./hooks/useGames";
import GameCard from "./components/GameCard";


const categories = [
  "all",
  "shooter",
  "mmorpg",
  "strategy",
  "racing",
  "sports",
  "card",
];

const platforms = [
  "all",
  "pc",
  "browser"
];

const GamesMainPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const platform = searchParams.get("platform") || "all";

  const {
    games,
    loading,
    error,
    page,
    totalPages
  } = useGames(
    category === "all" ? undefined : category,
    platform === "all" ? undefined : platform
  );

  const setPage = useGamesStore((state) => state.setPage);
  const totalGames = useGamesStore((state) => state.filteredGames.length);

  const changeCategory = (cat: string) => {
    setPage(1);

    if (cat === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({ category: cat });
  };

  const changePlatform = (plat: string) => {
    setPage(1);

    const params: any = {};

    if (category !== "all") params.category = category;
    if (plat !== "all") params.platform = plat;

    setSearchParams(params);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="container py-4">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

        <h2 className="m-0">
          Free To Play Games
        </h2>

        <span className="badge bg-secondary fs-6">
          {totalGames} juegos
        </span>

      </div>

      {/* FILTERS */}

      <div className="mb-4 d-flex flex-wrap gap-2">

        {categories.map((cat) => (

          <button
            key={cat}
            className={`btn btn-sm ${category === cat
                ? "category-btn-active"
                : "category-btn"
              }`}
            onClick={() => changeCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>

        ))}
        

      </div>

      {/* PLATFORM FILTER */}

      <div className="mb-4 d-flex flex-wrap gap-2">

        {platforms.map((plat) => (

          <button
            key={plat}
            className={`btn btn-sm ${platform === plat
                ? "category-btn-active"
                : "category-btn"
              }`}
            onClick={() => changePlatform(plat)}
          >
            {plat === "all" ? "ALL PLATFORMS" : plat.toUpperCase()}
          </button>

        ))}

      </div>

      {/* ERROR */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* LOADING */}

      {loading && (

        <div className="row g-4">

          {Array.from({ length: 8 }).map((_, i) => (

            <div
              key={i}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card placeholder-glow">

                <div className="placeholder card-img-top" style={{ height: 180 }} />

                <div className="card-body">

                  <h5 className="card-title placeholder col-6"></h5>

                  <p className="card-text placeholder col-12"></p>
                  <p className="card-text placeholder col-8"></p>

                </div>

              </div>
            </div>

          ))}

        </div>

      )}

      {/* EMPTY */}

      {!loading && games.length === 0 && (

        <div className="text-center py-5">

          <h5>No se encontraron juegos</h5>

        </div>

      )}

      {/* GRID */}

      {!loading && games.length > 0 && (

        <div className="row g-4">

          {games.map((game) => (

            <div
              key={game.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <GameCard game={game} />
            </div>

          ))}

        </div>

      )}

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div className="d-flex justify-content-center align-items-center mt-5 gap-3 flex-wrap">

          <button
            className="btn btn-orange-outline"
            onClick={handlePrev}
            disabled={page === 1}
          >
            ← Anterior
          </button>

          <span className="fw-semibold">
            Página {page} de {totalPages}
          </span>

          <button
            className="btn btn-orange-outline"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Siguiente →
          </button>

        </div>

      )}

    </div>
  );
};

export default GamesMainPage;