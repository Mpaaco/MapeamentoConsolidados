import { useEffect, useState } from "react";
import {
  Principal,
  Header,
  MetricsContainer,
  MetricCard,
  CategoryLevel,
  SearchBar,
  CategorySelector,
  DescriptionSection,
  StatusTable,
} from "./styles";
import Papa from "papaparse";

function PrincipalComponent() {
  // --- MÉTRICAS DO CSV ---
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPlUbYjG8-5n3b1x23TfJf0MulaIeV62zL_Ilo9QMIbXSOSIBlIdM2uvu1LNXpL8a76SFEhNFWGtqI/pub?output=csv";

    Papa.parse(url, {
      download: true,
      header: true,
      complete: function (results) {
        const formatted = results.data.map((row) => ({
          title: row.Categorias,
          value: row.Valores,
        }));
        setMetrics(formatted);
      },
      error: function (err) {
        console.error("Erro ao carregar CSV:", err);
      },
    });
  }, []);

  // --- SELEÇÃO DE CATEGORIAS ---
  const [selectedLevels, setSelectedLevels] = useState({
    L0: "FMCG",
    L1: "100630 - Beauty",
    L2: "100666 - Others",
    L3: null,
    L4: null,
    L5: null,
  });

  const [activeLevel, setActiveLevel] = useState(3); // Começa no L3

  const categoryData = {
    L0: { label: "L0 - Cluster", options: ["FMCG", "Eletrônicos", "Moda"], nextLevel: "L1" },
    L1: { label: "L1 - Level 1", options: ["100630 - Beauty", "100631 - Health", "100632 - Food"], nextLevel: "L2" },
    L2: { label: "L2 - Level 2", options: ["100666 - Others", "100667 - Hair Care", "100668 - Skin Care"], nextLevel: "L3" },
    L3: { label: "L3 - Level 3", options: ["Option L3-A", "Option L3-B", "Option L3-C"], nextLevel: "L4" },
    L4: { label: "L4 - Level 4", options: ["Option L4-A", "Option L4-B", "Option L4-C"], nextLevel: "L5" },
    L5: { label: "L5 - Level 5", options: ["Option L5-A", "Option L5-B", "Option L5-C"], nextLevel: null },
  };

  const handleSelect = (level, value) => {
    const levelIndex = parseInt(level.replace("L", ""));
    const newSelectedLevels = { ...selectedLevels };

    // Limpa os níveis seguintes
    for (let i = levelIndex + 1; i <= 5; i++) {
      newSelectedLevels[`L${i}`] = null;
    }

    newSelectedLevels[level] = value;
    setSelectedLevels(newSelectedLevels);
    setActiveLevel(levelIndex + 1);
  };

  const renderCategoryLevels = () => {
    const levels = ["L0", "L1", "L2", "L3", "L4", "L5"];
    return levels.map((level, index) => {
      const data = categoryData[level];
      const selectedValue = selectedLevels[level];
      const isVisible = index <= activeLevel || selectedValue;

      if (!isVisible) return null;

      return (
        <CategoryLevel key={level}>
          <p>{data.label}</p>
          <select value={selectedValue || ""} onChange={(e) => handleSelect(level, e.target.value)}>
            <option value="" disabled>
              Selecione uma opção
            </option>
            {data.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </CategoryLevel>
      );
    });
  };

  const lastSelectedLevel = Object.keys(selectedLevels)
    .reverse()
    .find((key) => selectedLevels[key] !== null);
  const lastSelectedValue = lastSelectedLevel ? selectedLevels[lastSelectedLevel] : "Nenhuma categoria selecionada";

  return (
    <Principal>
      {/* HEADER */}
      <Header>
        <h1>Mapeamento Consolidado</h1>
        <h2>Categorias e Atributos</h2>
      </Header>

      {/* MÉTRICAS */}
      <MetricsContainer>
        {metrics.length > 0
          ? metrics.map((metric, index) => (
              <MetricCard key={index}>
                <h3>{metric.title}</h3>
                <p>{metric.value}</p>
              </MetricCard>
            ))
          : "Carregando métricas..."}
      </MetricsContainer>

      {/* BUSCA */}
      <SearchBar>
        <p>Pesquise a categoria...</p>
      </SearchBar>

      {/* SELEÇÃO DE CATEGORIA */}
      <CategorySelector>
        <h3>Category Levels</h3>
        {renderCategoryLevels()}
      </CategorySelector>

      {/* DESCRIÇÃO E TABELA */}
      <DescriptionSection>
        <div className="description-text">
          <h4>Description</h4>
          <p>Descrição para: <strong>{lastSelectedValue}</strong></p>
          <p>
            This category brings together a variety of essential products for different beauty needs. Here, you'll find tattoo devices and machines, as well as needles for precise and professional procedures. Ideal for those seeking specialized equipment and accessories, ensuring quality and efficiency in aesthetic and artistic care.
          </p>
        </div>

        <StatusTable>
          <thead>
            <tr>
              <th>OKList</th>
              <th>Local Status</th>
              <th>CB Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ativo</td>
              <td>Ativo</td>
              <td>Ativo</td>
            </tr>
            <tr>
              <td>Ativo</td>
              <td>Ativo</td>
              <td>Ativo</td>
            </tr>
            <tr>
              <td>Ativo</td>
              <td>Ativo</td>
              <td>Ativo</td>
            </tr>
            <tr>
              <td>Ativo</td>
              <td>Ativo</td>
              <td>Ativo</td>
            </tr>
          </tbody>
        </StatusTable>
      </DescriptionSection>
    </Principal>
  );
}

export default PrincipalComponent;
