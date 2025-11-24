import { useEffect, useState, useMemo } from "react";
import {
  Principal, 
  Conteudo,
  Header,
  MetricsContainer,
  MetricCard,
  CategoryLevel,
  SearchBar,
  SearchInput,
  SearchResults,
  SearchResultItem,
  CategorySelector,
  Select,
  Option
} from "./styles";
import Papa from "papaparse";

function PrincipalComponent() {
  // Estados para métricas
  const [metrics, setMetrics] = useState([]);
  
  // Estados para as categorias
  const [categories, setCategories] = useState({
    L0: [],
    L1: {},
    allData: [] // Armazenar todos os dados originais para busca
  });

  // Estados para as seleções
  const [selected, setSelected] = useState({
    L0: '',
    L1: ''
  });
  
  // Estado para busca
  const [searchTerm, setSearchTerm] = useState('');

  // URLs das planilhas
  const metricsUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPlUbYjG8-5n3b1x23TfJf0MulaIeV62zL_Ilo9QMIbXSOSIBlIdM2uvu1LNXpL8a76SFEhNFWGtqI/pub?output=csv";
  const categoryUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vScHy3wpOqOxIRNk6a32-IwhOmP4JSujEOErSxuFRX3z_fbIP3gDoctM_xKdkOTTcWt3OElQlfUWRkY/pub?gid=1580603037&single=true&output=csv";

  // Função para lidar com mudanças na seleção
  const handleSelectChange = (level, value) => {
    setSelected(prev => {
      const newState = { ...prev, [level]: value };
      
      // Se mudou o L0, limpa o L1
      if (level === 'L0') {
        newState.L1 = '';
      }
      
      return newState;
    });
  };

  // Carregar métricas
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

  // Função para remover acentos e caracteres especiais
  const normalizeString = (str) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .toLowerCase()
      .trim();
  };

  // Função para buscar correspondências
  const searchCategories = (term) => {
    if (!term.trim() || !categories.allData.length) return [];
    
    const normalizedTerm = normalizeString(term);
    
    return categories.allData.filter(item => {
      const l0 = item.cluster?.trim() || '';
      const l1Id = item.level1_global_be_category_id?.trim() || '';
      const l1Name = item.level1_global_be_category?.trim() || '';
      
      return (
        normalizeString(l0).includes(normalizedTerm) ||
        l1Id.includes(term) || // Busca exata por ID
        normalizeString(l1Name).includes(normalizedTerm)
      );
    });
  };

  // Resultados da busca
  const searchResults = useMemo(() => {
    return searchCategories(searchTerm);
  }, [searchTerm, categories.allData]);

  // Carregar categorias
  useEffect(() => {
    Papa.parse(categoryUrl, {
      download: true,
      header: true,
      complete: (results) => {
        // Normalizar cabeçalhos
        const normalizedRows = results.data.map((row) => {
          const clean = {};
          for (const key in row) {
            const cleanKey = key
              .trim()
              .replace(/^\uFEFF/, "")
              .replace(/\s+/g, "_")
              .replace(/[^\w_]/g, "")
              .toLowerCase();
            clean[cleanKey] = row[key];
          }
          return clean;
        });

        // Extrair categorias L0 únicas
        const l0Categories = [...new Set(
          normalizedRows
            .map(row => row.cluster?.trim())
            .filter(Boolean)
        )];

        // Mapear L0 para L1 com ID e Nome
        const l1Categories = {};
        normalizedRows.forEach(row => {
          const l0 = row.cluster?.trim();
          const l1Id = row.level1_global_be_category_id?.trim();
          const l1Name = row.level1_global_be_category?.trim();
          
          if (l0 && l1Id && l1Name) {
            if (!l1Categories[l0]) {
              l1Categories[l0] = new Set();
            }
            // Formatar como 'ID - Nome'
            l1Categories[l0].add(`${l1Id} - ${l1Name}`);
          }
        });

        // Converter Sets para Arrays
        const l1CategoriesFormatted = {};
        Object.keys(l1Categories).forEach(key => {
          l1CategoriesFormatted[key] = Array.from(l1Categories[key]);
        });

        setCategories({
          L0: l0Categories,
          L1: l1CategoriesFormatted,
          allData: normalizedRows // Salvar todos os dados para busca
        });
      },
      error: (err) => console.error("Erro ao carregar categorias:", err),
    });
  }, []);

  return (
    <Principal>
      <Conteudo>
        <Header>
          <h1>Mapeamento Consolidado - Categorias e Atributos</h1>
        </Header>

        <MetricsContainer>
          {metrics.map((metric, index) => (
            <MetricCard key={index}>
              <h3>{metric.title}</h3>
              <p>{metric.value}</p>
            </MetricCard>
          ))}
        </MetricsContainer>

        <SearchBar>
          <SearchInput 
            type="text" 
            placeholder="Pesquise por L0, ID L1 ou Nome L1..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && searchResults.length > 0 && (
            <SearchResults>
              {searchResults.map((item, index) => {
                const l0 = item.cluster?.trim() || '';
                const l1Id = item.level1_global_be_category_id?.trim() || '';
                const l1Name = item.level1_global_be_category?.trim() || '';
                const l1Display = l1Id && l1Name ? `${l1Id} - ${l1Name}` : '';
                
                return (
                  <SearchResultItem 
                    key={`result-${index}`}
                    onClick={() => {
                      setSelected({
                        L0: l0,
                        L1: l1Display
                      });
                      setSearchTerm('');
                    }}
                  >
                    <div><strong>L0:</strong> {l0}</div>
                    {l1Display && <div><strong>L1:</strong> {l1Display}</div>}
                  </SearchResultItem>
                );
              })}
            </SearchResults>
          )}
        </SearchBar>

        <CategoryLevel>
          <h2>Níveis de Categoria</h2>
          <CategorySelector>
            <Select
              value={selected.L0}
              onChange={(e) => handleSelectChange('L0', e.target.value)}
            >
              <Option value="">Selecione um Cluster (L0)</Option>
              {categories.L0.map((category, index) => (
                <Option key={`l0-${index}`} value={category}>
                  {category}
                </Option>
              ))}
            </Select>

            <Select
              value={selected.L1}
              onChange={(e) => handleSelectChange('L1', e.target.value)}
              disabled={!selected.L0}
            >
              <Option value="">
                {selected.L0 ? 'Selecione uma categoria L1' : 'Selecione um cluster L0 primeiro'}
              </Option>
              {selected.L0 && categories.L1[selected.L0]?.map((category, index) => (
                <Option key={`l1-${index}`} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </CategorySelector>

          <div className="description-text">
            <h4>Descrição</h4>
            <p>Categoria selecionada: <strong>{selected.L1 || 'Nenhuma'}</strong></p>
            {selected.L1 && (
              <p>Detalhes adicionais sobre a categoria selecionada serão exibidos aqui.</p>
            )}
          </div>
        </CategoryLevel>
      </Conteudo>
    </Principal>
  );
}

export default PrincipalComponent;
