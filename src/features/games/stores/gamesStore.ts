import { create } from "zustand";
import type { Game } from "../../../shared/types/api.types";

interface GamesState {
  games: Game[]
  filteredGames: Game[]

  loading: boolean
  error: string | null

  category: string | null
  platform: string | null

  page: number
  pageSize: number

  search: string
  
  setGames: (games: Game[]) => void
  setFilteredGames: (games: Game[]) => void
  
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  setCategory: (category: string | null) => void
  setPlatform: (platform: string | null) => void
  
  setPage: (page: number) => void

  setSearch: (search: string) => void
  applyFilters: () => void
}

export const useGamesStore = create<GamesState>((set, get) => ({

  games: [],
  filteredGames: [],

  loading: false,
  error: null,

  category: null,
  platform: null,

  page: 1,
  pageSize: 20,

  search: "",

  setGames: (games) => set({ games }),
  setFilteredGames: (filteredGames) => set({ filteredGames }),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  setCategory: (category) => set({ category, page: 1 }),
  setPlatform: (platform) => set({ platform, page: 1 }),

  setPage: (page) => set({ page }),

  setSearch: (search) => {
    set({ search, page: 1 });
    get().applyFilters();
  },
  applyFilters: () => {

    const { games, category, platform, search } = get();

    let filtered = games;

    if (category) {
      filtered = filtered.filter(
        (g) => g.genre.toLowerCase() === category.toLowerCase()
      );
    }

    if (platform) {
      filtered = filtered.filter(
        (g) => g.platform.toLowerCase().includes(platform.toLowerCase())
      );
    }

    if (search) {
      filtered = filtered.filter(
        (g) => g.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    set({ filteredGames: filtered });

  }
  

}));