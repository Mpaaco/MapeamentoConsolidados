import { useEffect, useState } from "react";
import {
  Principal, Conteudo,
  Header,
  MetricsContainer,
  MetricCard,
  CategoryLevel,
  SearchBar,
  CategorySelector,
} from "./styles";
import Papa from "papaparse";

function PrincipalComponent() {

  const [metrics, setMetrics] = useState([]);

  const metricsUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPlUbYjG8-5n3b1x23TfJf0MulaIeV62zL_Ilo9QMIbXSOSIBlIdM2uvu1LNXpL8a76SFEhNFWGtqI/pub?output=csv";

  const categoryUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQfATojrBXyZEir-KgyVwW7WfQrDfFkuHXApAOk60t7u0fWvv95HUbctbMzE_aRQZ8meEJwO4GjFXHO/pubhtml?gid=1590754718&single=true"

  // ==============================
  // CATEGORY DATA
  // ==============================
  const [categoryData, setCategoryData] = useState({
    L0: { label: "L0 - Cluster", options: [], nextLevel: "L1" },
    L1: { label: "L1 - Level 1", options: [], nextLevel: "L2" },
    L2: { label: "L2 - Level 2", options: ["Option L2-A", "Option L2-B", "Option L2-C"], nextLevel: "L3" },
    L3: { label: "L3 - Level 3", options: ["Option L3-A", "Option L3-B", "Option L3-C"], nextLevel: "L4" },
    L4: { label: "L4 - Level 4", options: ["Option L4-A", "Option L4-B", "Option L4-C"], nextLevel: "L5" },
    L5: { label: "L5 - Level 5", options: ["Option L5-A", "Option L5-B", "Option L5-C"], nextLevel: null },
  });

  const [selectedLevels, setSelectedLevels] = useState({
    L0: null,
    L1: null,
    L2: null,
    L3: null,
    L4: null,
    L5: null,
  });

  const [activeLevel, setActiveLevel] = useState(0);


// Teste numbers
  useEffect(() => {
    Papa.parse(metricsUrl, {
      download: true,
      header: true,
      complete: function (results) {
        const formattedMetrics = results.data.map((row) => ({
          title: row.Categorias,
          value: row.Valores,
        }));

        setMetrics(formattedMetrics);
      },
      error: function (err) {
        console.error("Erro ao carregar métricas:", err);
      },
    });
  }, []);


  // CSV 2 - CATEGORIAS (L0, L1)
  useEffect(() => {
    Papa.parse(categoryUrl, {
      download: true,
      header: true,
      complete: function (results) {
        const cleanedRows = results.data.filter(row =>
          row.cluster ||
          row.level1_global_be_category_id ||
          row.level1_global_be_category
        );

        // L0 "cluster"
        const L0options = [
          ...new Set(
            cleanedRows
              .map(r => r.cluster?.trim())
              .filter(Boolean)
          )
        ];

        // junção da coluna de id e categoria
        const L1options = [
          ...new Set(
            cleanedRows
              .map(r => {
                const id = r.level1_global_be_category_id?.trim();
                const name = r.level1_global_be_category?.trim();
                if (!id || !name) return null;
                return `${id} - ${name}`;
              })
              .filter(Boolean)
          )
        ];

        setCategoryData(prev => ({
          ...prev,
          L0: { ...prev.L0, options: L0options },
          L1: { ...prev.L1, options: L1options },
        }));
      },
      error: function (err) {
        console.error("Erro ao carregar categorias:", err);
      },
    });
  }, []);


  // ==============================
  // SELECT HANDLER
  // ==============================
  const handleSelect = (level, value) => {
    const levelIndex = parseInt(level.replace("L", ""));
    const newSelectedLevels = { ...selectedLevels };

    for (let i = levelIndex + 1; i <= 5; i++) {
      newSelectedLevels[`L${i}`] = null;
    }

    newSelectedLevels[level] = value;
    setSelectedLevels(newSelectedLevels);
    setActiveLevel(levelIndex + 1);
  };


 
  // Visualização
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
          <select
            value={selectedValue || ""}
            onChange={(e) => handleSelect(level, e.target.value)}
          >
            <option value="" disabled>Selecione uma opção</option>

            {data.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}

          </select>
        </CategoryLevel>
      );
    });
  };


  const lastSelectedLevel = Object.keys(selectedLevels)
    .reverse()
    .find(key => selectedLevels[key] !== null);

  const lastSelectedValue =
    lastSelectedLevel ? selectedLevels[lastSelectedLevel] : "Nenhuma categoria selecionada";


  return (
    <Principal>

      <Header>
        <h1>Mapeamento Consolidado</h1>
        <h2>Categorias e Atributos</h2>
      </Header>

      <Conteudo>

        <MetricsContainer>
          {metrics.length > 0
            ? metrics.map((metric, index) => (
              <MetricCard key={index}>
                <h3>{metric.title}</h3>
                <p>{metric.value}</p>
              </MetricCard>
            ))
            : "Carregando métricas..."
          }
        </MetricsContainer>


        <SearchBar>
          <input type="text" placeholder="Pesquise a categoria..." />
        </SearchBar>


        <CategorySelector>
          <h3>Category Levels</h3>

          {renderCategoryLevels()}

          <div className="description-text">
            <h4>Description</h4>
            <p>Descrição para: <strong>{lastSelectedValue}</strong></p>
            <p>
              This category brings together a variety of essential products...
            </p>
          </div>

        </CategorySelector>

      </Conteudo>

    </Principal>
  );
}

export default PrincipalComponent;
