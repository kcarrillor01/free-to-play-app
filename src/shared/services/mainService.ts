import toast from "react-hot-toast";
import { buildQueryParams } from "../utils/queryParams";

const DEFAULT_TIMEOUT = 10000; // ms

// usa variable de entorno si está, si no fallback a /api (útil para dev proxy)
const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) ?? "/api";

export class MainService {
  private static async fetchWithTimeout(input: RequestInfo, init?: RequestInit, timeout = DEFAULT_TIMEOUT) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(input, {
        ...init,
        signal: controller.signal,
      });
      clearTimeout(id);
      return response;
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  }

  static async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
    timeoutMs = DEFAULT_TIMEOUT
  ): Promise<T> {
    try {
      const query = buildQueryParams(params);
      const url = `${BASE_URL}${endpoint}${query}`;

      // debug log opcional en dev
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug("[MainService] GET", url);
      }

      const response = await this.fetchWithTimeout(url, { method: "GET", headers: { Accept: "application/json" } }, timeoutMs);

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        const msg = `HTTP Error: ${response.status} ${response.statusText}`;
        console.error("[MainService] non-ok response:", msg, text);
        toast.error(`Error del servidor (${response.status})`);
        // lanzar objeto con info útil
        const error: any = new Error(msg);
        error.status = response.status;
        error.body = text;
        throw error;
      }

      const data: T = await response.json();
      return data;
    } catch (error: any) {
      // timeout
      if (error && error.name === "AbortError") {
        toast.error("La petición tardó demasiado (timeout)");
        console.error("[MainService] request timeout");
        throw new Error("timeout");
      }

      // network o CORS (cuando fetch rechaza antes de recibir respuesta)
      const isNetworkError = error instanceof TypeError && error.message === "Failed to fetch";
      if (isNetworkError) {
        toast.error("Error de red: no se pudo conectar al servidor");
        console.error("[MainService] network error", error);
        throw new Error("network");
      }

      // error HTTP ya manejado arriba
      throw error;
    }
  }
}