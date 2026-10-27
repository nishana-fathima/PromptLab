import { useEffect, useState } from "react";

import { apiClient } from "../services/api";
import type { HealthResponse } from "../types/api";

export function useApiHealth() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    apiClient
      .get<HealthResponse>("/api/health")
      .then((response) => active && setData(response.data))
      .catch(() => active && setError("Backend is not reachable yet."))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}
