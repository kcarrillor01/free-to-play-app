import { useEffect, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import type { Game } from "../../../shared/types/api.types";
import { useGamesStore } from "../stores/gamesStore";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { gamesService } from "../services/gamesServices";

/**
 * useGames
 * - acepta filtros opcionales (category?, platform?)
 * - hace debounce a los filtros
 * - carga datos con gamesService (usa los métodos que ya existen)
 * - mantiene paginación del lado cliente usando el store
 */
export const useGames = (categoryParam?: string, platformParam?: string) => {
  const {
    filteredGames,
    loading,
    error,
    page,
    pageSize,

    setGames,
    setFilteredGames,
    setLoading,
    setError,
    setCategory,
    setPlatform,
    setPage
  } = useGamesStore();

  // debounce para evitar llamadas rápidas cuando el usuario cambia filtros
  const debouncedCategory = useDebounce<string | null>(
    categoryParam !== undefined ? categoryParam : null,
    400
  );
  const debouncedPlatform = useDebounce<string | null>(
    platformParam !== undefined ? platformParam : null,
    400
  );

  const loadGames = useCallback(
    async (opts?: { force?: boolean; showToast?: boolean }) => {
      try {
        setLoading(true);
        setError(null);

        let data: Game[] = [];

        if (debouncedCategory && debouncedPlatform) {
          data = await gamesService.getGamesByCategoryAndPlatform(
            debouncedCategory,
            debouncedPlatform
          );
        } else if (debouncedCategory) {
          data = await gamesService.getGamesByCategory(debouncedCategory);
        } else if (debouncedPlatform) {
          data = await gamesService.getGamesByPlatform(debouncedPlatform);
        } else {
          data = await gamesService.getAllGames();
        }

        // guardamos datos completos en el store
        setGames(data);
        setFilteredGames(data);

        if (opts?.showToast) {
          toast.success("Juegos cargados");
        }
      } catch (e) {
        console.error("useGames load error:", e);
        const message = e instanceof Error ? e.message : "Error cargando juegos";
        setError(message);
        toast.error("Error cargando juegos");
        // rethrow por si el componente que llama quiere manejar la excepción
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [debouncedCategory, debouncedPlatform, setGames, setFilteredGames, setLoading, setError]
  );

  // cuando cambia el debounce de filtros, actualizamos el store y recargamos (y reseteamos página)
  useEffect(() => {
    setCategory(debouncedCategory ?? null);
    setPlatform(debouncedPlatform ?? null);
    setPage(1);
    // no await: loadGames maneja su propio estado
    loadGames().catch(() => {
      /* ya manejado en loadGames */
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCategory, debouncedPlatform, loadGames]);

  // paginación (slice en cliente)
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return filteredGames.slice(start, end);
  }, [filteredGames, page, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredGames.length / pageSize));

  return {
    // datos para render
    games: paginated,
    loading,
    error,

    // paginación
    page,
    pageSize,
    totalPages,
    setPage,

    // setters útiles
    setCategory,
    setPlatform,

    // acciones
    loadGames,
    refresh: () => loadGames({ force: true, showToast: true }),
  };
};