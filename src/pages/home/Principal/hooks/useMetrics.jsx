import { useState, useEffect } from "react";
import Papa from "papaparse";

const metricsUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPlUbYjG8-5n3b1x23TfJf0MulaIeV62zL_Ilo9QMIbXSOSIBlIdM2uvu1LNXpL8a76SFEhNFWGtqI/pub?output=csv";

/**
 * Hook personalizado para carregar e gerenciar as métricas.
 * @returns {Array} Um array contendo as métricas formatadas.
 */
export function useMetrics() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    Papa.parse(metricsUrl, {
      download: true,
      header: true,
      complete: (results) => {
        const formattedMetrics = results.data.map((row) => ({
          title: row.Categorias,
          value: row.Valores,
        }));
        setMetrics(formattedMetrics);
      },
      error: (err) => console.error("Erro ao carregar métricas:", err),
    });
  }, []);

  return metrics;
}
