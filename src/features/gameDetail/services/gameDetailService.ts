import { MainService } from "../../../shared/services/mainService";
import type { GameDetail } from "../../../shared/types/api.types";

export const gameDetailService = {
  async getGameById(id: string | number): Promise<GameDetail> {
    // MainService.get construye los query params automáticamente
    return MainService.get<GameDetail>("/game", { id });
  }
};