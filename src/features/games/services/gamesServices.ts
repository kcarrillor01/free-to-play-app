import { MainService } from "../../../shared/services/mainService";
import type { Game } from "../../../shared/types/api.types";

export const gamesService = {

  async getAllGames(): Promise<Game[]> {
    return MainService.get<Game[]>("/games");
  },

  async getGamesByCategory(category: string): Promise<Game[]> {
    return MainService.get<Game[]>("/games", { category });
  },

  async getGamesByPlatform(platform: string): Promise<Game[]> {
    return MainService.get<Game[]>("/games", { platform });
  },

  async getGamesByCategoryAndPlatform(
    category: string,
    platform: string
  ): Promise<Game[]> {

    return MainService.get<Game[]>("/games", {
      category,
      platform
    });

  }

};