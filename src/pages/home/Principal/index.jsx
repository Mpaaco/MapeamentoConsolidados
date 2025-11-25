import { useEffect, useState, useMemo } from "react";
import { Search } from 'react-feather';
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
  Option,
  DescriptionSection,
  DetailsContainer,
  InfoSection,
  InfoItem,
  SearchButton,
  CategoryHeader,
  SearchContainer
} from "./styles";
import Papa from "papaparse";

function PrincipalComponent() {
  // Estados para métricas
  const [metrics, setMetrics] = useState([]);
  
  // Estados para as categorias
  const [categories, setCategories] = useState({
    L0: [],
    L1: {},
    L2: {},
    L3: {},
    L4: {},
    L5: {},
    allData: [], // Armazenar todos os dados originais para busca
    byLanguage: {} // Categorias agrupadas por idioma
  });

  // Estados para as seleções
  const [selected, setSelected] = useState({
    language: '',
    L0: '',
    L1: '',
    L2: '',
    L3: '',
    L4: '',
    L5: ''
  });
  
  // Estado para a descrição da categoria
  const [categoryDescription, setCategoryDescription] = useState('não possui descrição');
  
  // Estado para os detalhes da categoria selecionada
  const [categoryDetails, setCategoryDetails] = useState({
    localStatus: 'N/A',
    cbStatus: 'N/A',
    okList: 'N/A',
    regulatoryAgency: 'N/A'
  });
  
  // Idiomas disponíveis
  const availableLanguages = ['English', 'Português'];
  
  // Estado para busca
  const [searchTerm, setSearchTerm] = useState('');

  // URLs das planilhas
  const metricsUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPlUbYjG8-5n3b1x23TfJf0MulaIeV62zL_Ilo9QMIbXSOSIBlIdM2uvu1LNXpL8a76SFEhNFWGtqI/pub?output=csv";
  const categoryUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vScHy3wpOqOxIRNk6a32-IwhOmP4JSujEOErSxuFRX3z_fbIP3gDoctM_xKdkOTTcWt3OElQlfUWRkY/pub?gid=1580603037&single=true&output=csv";

  // Função para lidar com mudanças na seleção
  const handleSelectChange = (level, value) => {
    setSelected(prev => {
      const newState = { ...prev, [level]: value };
      
      // Se mudou o idioma, limpa todas as seleções
      if (level === 'language') {
        newState.L0 = '';
        newState.L1 = '';
        newState.L2 = '';
        newState.L3 = '';
        newState.L4 = '';
        newState.L5 = '';
      } else {
        // Limpar níveis inferiores quando um nível superior é alterado
        const levels = ['L0', 'L1', 'L2', 'L3', 'L4', 'L5'];
        const currentLevelIndex = levels.indexOf(level);
        
        // Limpar todos os níveis abaixo do atual
        for (let i = currentLevelIndex + 1; i < levels.length; i++) {
          newState[levels[i]] = '';
        }
      }
      
      return newState;
    });
  };

  // Efeito para atualizar a descrição e detalhes quando a seleção mudar
  useEffect(() => {
    const updateCategoryDetails = () => {
      if (!selected.L0) {
        setCategoryDescription('não possui descrição');
        setCategoryDetails({
          localStatus: 'N/A',
          cbStatus: 'N/A',
          okList: 'N/A',
          regulatoryAgency: 'N/A'
        });
        return;
      }

      // Encontra a linha que corresponde à seleção atual
      const selectedRow = categories.allData.find(row => {
        const rowL0 = row.cluster?.trim();
        const rowL1 = row.level1_global_be_category_id && row.level1_global_be_category 
          ? `${row.level1_global_be_category_id.trim()} - ${row.level1_global_be_category.trim()}`
          : '';
        const rowL2 = row.level2_global_be_category_id && row.level2_global_be_category 
          ? `${row.level2_global_be_category_id.trim()} - ${row.level2_global_be_category.trim()}`
          : '';
        const rowL3 = row.level3_global_be_category_id && row.level3_global_be_category 
          ? `${row.level3_global_be_category_id.trim()} - ${row.level3_global_be_category.trim()}`
          : '';
        const rowL4 = row.level4_global_be_category_id && row.level4_global_be_category 
          ? `${row.level4_global_be_category_id.trim()} - ${row.level4_global_be_category.trim()}`
          : '';
        const rowL5 = row.level5_global_be_category_id && row.level5_global_be_category 
          ? `${row.level5_global_be_category_id.trim()} - ${row.level5_global_be_category.trim()}`
          : '';

        // Verifica se a linha corresponde à seleção atual
        return (
          rowL0 === selected.L0 &&
          (!selected.L1 || rowL1 === selected.L1) &&
          (!selected.L2 || rowL2 === selected.L2) &&
          (!selected.L3 || rowL3 === selected.L3) &&
          (!selected.L4 || rowL4 === selected.L4) &&
          (!selected.L5 || rowL5 === selected.L5)
        );
      });

      // Atualiza a descrição se encontrou uma linha correspondente
      if (selectedRow) {
        if (selectedRow.describe?.trim()) {
          setCategoryDescription(selectedRow.describe.trim());
        } else {
          setCategoryDescription('não possui descrição');
        }

        // Log para depuração - verificar as chaves disponíveis na linha selecionada
        console.log('Chaves disponíveis na linha selecionada:', Object.keys(selectedRow));
        
        // Verificar valores específicos para depuração
        console.log('ok_list:', selectedRow.ok_list);
        console.log('ok_list (tipo):', typeof selectedRow.ok_list);
        console.log('regulatory_agency:', selectedRow.regulatory_agency);
        console.log('regulatory_agency (tipo):', typeof selectedRow.regulatory_agency);
        
        // Atualiza os detalhes da categoria com verificação de nulo/indefinido
        setCategoryDetails({
          localStatus: selectedRow.local_status?.trim() || 'N/A',
          cbStatus: selectedRow.cb_status?.trim() || 'N/A',
          okList: selectedRow.ok_list?.trim() || 'N/A',
          regulatoryAgency: selectedRow.regulatory_agency?.trim() || 'N/A'
        });
        
        // Log dos detalhes que serão definidos
        console.log('Detalhes da categoria definidos:', {
          localStatus: selectedRow.local_status?.trim() || 'N/A',
          cbStatus: selectedRow.cb_status?.trim() || 'N/A',
          okList: selectedRow.ok_list?.trim() || 'N/A',
          regulatoryAgency: selectedRow.regulatory_agency?.trim() || 'N/A'
        });
      } else {
        setCategoryDescription('não possui descrição');
        setCategoryDetails({
          localStatus: 'N/A',
          cbStatus: 'N/A',
          okList: 'N/A',
          regulatoryAgency: 'N/A'
        });
      }
    };

    updateCategoryDetails();
  }, [selected, categories.allData]);

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
    if (!str) return '';
    return String(str)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .toLowerCase()
      .trim();
  };

  // Função para obter categorias filtradas por nível
  const getFilteredCategories = (level) => {
    // Se não tiver idioma selecionado, não retorna nada
    if (!selected.language) return [];
    
    // Para L0, retorna as categorias do idioma selecionado
    if (level === 'L0') {
      return categories.byLanguage[selected.language]?.L0 || [];
    }
    
    // Para L1, filtra as categorias que pertencem ao L0 selecionado e ao idioma
    if (level === 'L1') {
      if (!selected.L0) return [];
      
      // Filtra as categorias L1 que pertencem ao L0 selecionado e ao idioma
      const l1ForLanguage = [];
      categories.allData.forEach(row => {
        const rowLanguage = row.language?.trim() || 'English';
        const rowL0 = row.cluster?.trim();
        const l1Id = row.level1_global_be_category_id?.trim();
        const l1Name = row.level1_global_be_category?.trim();
        
        if (rowLanguage === selected.language && rowL0 === selected.L0 && l1Id && l1Name) {
          const l1Value = `${l1Id} - ${l1Name}`;
          if (!l1ForLanguage.includes(l1Value)) {
            l1ForLanguage.push(l1Value);
          }
        }
      });
      
      return l1ForLanguage.sort();
    }
    
    // Para níveis superiores, construímos a chave baseada nas seleções anteriores
    let parentKey = '';
    
    if (level === 'L2') {
      if (!selected.L0 || !selected.L1) return [];
      
      const l2ForLanguage = [];
      categories.allData.forEach(row => {
        const rowLanguage = row.language?.trim() || 'English';
        const rowL0 = row.cluster?.trim();
        const l1Id = row.level1_global_be_category_id?.trim();
        const l1Name = row.level1_global_be_category?.trim();
        const l2Id = row.level2_global_be_category_id?.trim();
        const l2Name = row.level2_global_be_category?.trim();
        
        if (rowLanguage === selected.language && 
            rowL0 === selected.L0 && 
            l1Id && l1Name && 
            `${l1Id} - ${l1Name}` === selected.L1 && 
            l2Id && l2Name) {
          
          const l2Value = `${l2Id} - ${l2Name}`;
          if (!l2ForLanguage.includes(l2Value)) {
            l2ForLanguage.push(l2Value);
          }
        }
      });
      
      return l2ForLanguage.sort();
    }
    
    if (level === 'L3') {
      if (!selected.L0 || !selected.L1 || !selected.L2) return [];
      
      const l3ForLanguage = [];
      categories.allData.forEach(row => {
        const rowLanguage = row.language?.trim() || 'English';
        const rowL0 = row.cluster?.trim();
        const l1Id = row.level1_global_be_category_id?.trim();
        const l1Name = row.level1_global_be_category?.trim();
        const l2Id = row.level2_global_be_category_id?.trim();
        const l2Name = row.level2_global_be_category?.trim();
        const l3Id = row.level3_global_be_category_id?.trim();
        const l3Name = row.level3_global_be_category?.trim();
        
        if (rowLanguage === selected.language && 
            rowL0 === selected.L0 && 
            l1Id && l1Name && 
            `${l1Id} - ${l1Name}` === selected.L1 &&
            l2Id && l2Name &&
            `${l2Id} - ${l2Name}` === selected.L2 &&
            l3Id && l3Name) {
          
          const l3Value = `${l3Id} - ${l3Name}`;
          if (!l3ForLanguage.includes(l3Value)) {
            l3ForLanguage.push(l3Value);
          }
        }
      });
      
      return l3ForLanguage.sort();
    }
    
    if (level === 'L4') {
      if (!selected.L0 || !selected.L1 || !selected.L2 || !selected.L3) return [];
      
      const l4ForLanguage = [];
      categories.allData.forEach(row => {
        const rowLanguage = row.language?.trim() || 'English';
        const rowL0 = row.cluster?.trim();
        const l1Id = row.level1_global_be_category_id?.trim();
        const l1Name = row.level1_global_be_category?.trim();
        const l2Id = row.level2_global_be_category_id?.trim();
        const l2Name = row.level2_global_be_category?.trim();
        const l3Id = row.level3_global_be_category_id?.trim();
        const l3Name = row.level3_global_be_category?.trim();
        const l4Id = row.level4_global_be_category_id?.trim();
        const l4Name = row.level4_global_be_category?.trim();
        
        if (rowLanguage === selected.language && 
            rowL0 === selected.L0 && 
            l1Id && l1Name && 
            `${l1Id} - ${l1Name}` === selected.L1 &&
            l2Id && l2Name &&
            `${l2Id} - ${l2Name}` === selected.L2 &&
            l3Id && l3Name &&
            `${l3Id} - ${l3Name}` === selected.L3 &&
            l4Id && l4Name) {
          
          const l4Value = `${l4Id} - ${l4Name}`;
          if (!l4ForLanguage.includes(l4Value)) {
            l4ForLanguage.push(l4Value);
          }
        }
      });
      
      return l4ForLanguage.sort();
    }
    
    if (level === 'L5') {
      if (!selected.L0 || !selected.L1 || !selected.L2 || !selected.L3 || !selected.L4) return [];
      
      const l5ForLanguage = [];
      categories.allData.forEach(row => {
        const rowLanguage = row.language?.trim() || 'English';
        const rowL0 = row.cluster?.trim();
        const l1Id = row.level1_global_be_category_id?.trim();
        const l1Name = row.level1_global_be_category?.trim();
        const l2Id = row.level2_global_be_category_id?.trim();
        const l2Name = row.level2_global_be_category?.trim();
        const l3Id = row.level3_global_be_category_id?.trim();
        const l3Name = row.level3_global_be_category?.trim();
        const l4Id = row.level4_global_be_category_id?.trim();
        const l4Name = row.level4_global_be_category?.trim();
        const l5Id = row.level5_global_be_category_id?.trim();
        const l5Name = row.level5_global_be_category?.trim();
        
        if (rowLanguage === selected.language && 
            rowL0 === selected.L0 && 
            l1Id && l1Name && 
            `${l1Id} - ${l1Name}` === selected.L1 &&
            l2Id && l2Name &&
            `${l2Id} - ${l2Name}` === selected.L2 &&
            l3Id && l3Name &&
            `${l3Id} - ${l3Name}` === selected.L3 &&
            l4Id && l4Name &&
            `${l4Id} - ${l4Name}` === selected.L4 &&
            l5Id && l5Name) {
          
          const l5Value = `${l5Id} - ${l5Name}`;
          if (!l5ForLanguage.includes(l5Value)) {
            l5ForLanguage.push(l5Value);
          }
        }
      });
      
      return l5ForLanguage.sort();
    }
    
    return [];
  };

  const filteredL1 = getFilteredCategories('L1');
  const filteredL2 = getFilteredCategories('L2');
  const filteredL3 = getFilteredCategories('L3');
  const filteredL4 = getFilteredCategories('L4');
  const filteredL5 = getFilteredCategories('L5');

  /**
   * Função para buscar categorias com base no termo de busca
   * Retorna um array de itens formatados com os níveis hierárquicos
   */
  const searchCategories = (term) => {
    if (!term.trim() || !categories.allData.length) return [];
    
    const normalizedTerm = normalizeString(term);
    
    return categories.allData
      .filter(item => {
        const l0 = item.cluster?.trim() || '';
        const l1Id = item.level1_global_be_category_id?.trim() || '';
        const l1Name = item.level1_global_be_category?.trim() || '';
        const l2Id = item.level2_global_be_category_id?.trim() || '';
        const l2Name = item.level2_global_be_category?.trim() || '';
        const l3Id = item.level3_global_be_category_id?.trim() || '';
        const l3Name = item.level3_global_be_category?.trim() || '';
        const l4Id = item.level4_global_be_category_id?.trim() || '';
        const l4Name = item.level4_global_be_category?.trim() || '';
        const l5Id = item.level5_global_be_category_id?.trim() || '';
        const l5Name = item.level5_global_be_category?.trim() || '';
        
        return (
          normalizeString(l0).includes(normalizedTerm) ||
          l1Id.includes(term) || // Busca exata por ID
          l2Id.includes(term) ||
          l3Id.includes(term) ||
          l4Id.includes(term) ||
          l5Id.includes(term) ||
          normalizeString(l1Name).includes(normalizedTerm) ||
          normalizeString(l2Name).includes(normalizedTerm) ||
          normalizeString(l3Name).includes(normalizedTerm) ||
          normalizeString(l4Name).includes(normalizedTerm) ||
          normalizeString(l5Name).includes(normalizedTerm)
        );
      })
      .map(item => ({
        ...item,
        // Adiciona campos formatados para facilitar a exibição
        L0: item.cluster?.trim() || '',
        L1: item.level1_global_be_category_id && item.level1_global_be_category 
          ? `${item.level1_global_be_category_id.trim()} - ${item.level1_global_be_category.trim()}` 
          : '',
        L2: item.level2_global_be_category_id && item.level2_global_be_category 
          ? `${item.level2_global_be_category_id.trim()} - ${item.level2_global_be_category.trim()}` 
          : '',
        L3: item.level3_global_be_category_id && item.level3_global_be_category 
          ? `${item.level3_global_be_category_id.trim()} - ${item.level3_global_be_category.trim()}` 
          : '',
        L4: item.level4_global_be_category_id && item.level4_global_be_category 
          ? `${item.level4_global_be_category_id.trim()} - ${item.level4_global_be_category.trim()}` 
          : '',
        L5: item.level5_global_be_category_id && item.level5_global_be_category 
          ? `${item.level5_global_be_category_id.trim()} - ${item.level5_global_be_category.trim()}` 
          : ''
      }));
  };

  /**
   * Função chamada quando um resultado da busca é selecionado
   * Preenche automaticamente os filtros com os valores correspondentes
   */
  const handleSearchSelect = (item) => {
    // Limpa a busca
    setSearchTerm('');
    
    // Atualiza o estado com os valores encontrados
    setSelected(prev => ({
      ...prev,
      language: item.language?.trim() || 'English',
      L0: item.L0 || '',
      L1: item.L1 || '',
      L2: item.L2 || '',
      L3: item.L3 || '',
      L4: item.L4 || '',
      L5: item.L5 || ''
    }));
    
    // Encontra a linha completa para atualizar a descrição
    const selectedRow = categories.allData.find(row => {
      const rowL0 = row.cluster?.trim() || '';
      const l1Id = row.level1_global_be_category_id?.trim() || '';
      const l1Name = row.level1_global_be_category?.trim() || '';
      const rowL1 = l1Id && l1Name ? `${l1Id} - ${l1Name}` : '';
      
      return rowL0 === item.L0 && rowL1 === item.L1;
    });
    
    if (selectedRow?.describe?.trim()) {
      setCategoryDescription(selectedRow.describe.trim());
    } else {
      setCategoryDescription('não possui descrição');
    }
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
        // Log para depuração - verificar as chaves disponíveis
        if (results.data && results.data.length > 0) {
          console.log('Primeira linha dos dados brutos:', results.data[0]);
          console.log('Chaves disponíveis (brutas):', Object.keys(results.data[0]));
          
          // Verificar se as colunas desejadas existem (com diferentes variações)
          const firstRow = results.data[0];
          const availableKeys = Object.keys(firstRow);
          
          console.log('Procurando por colunas relacionadas a OKList e Agência Regulatória:');
          availableKeys.forEach(key => {
            const lowerKey = key.toLowerCase();
            if (lowerKey.includes('ok') || lowerKey.includes('list') || lowerKey.includes('agencia') || lowerKey.includes('regulat')) {
              console.log(`Coluna encontrada: '${key}' com valor:`, firstRow[key]);
            }
          });
        }
        
        // Normalizar cabeçalhos
        const normalizedRows = results.data.map((row, index) => {
          const clean = {};
          
          // Log da primeira linha para depuração
          if (index === 0) {
            console.log('Primeira linha antes da normalização:', row);
          }
          
          for (const key in row) {
            if (!key) continue; // Pula chaves vazias
            
            // Primeiro, limpa a chave
            let cleanKey = key
              .toString() // Garante que é uma string
              .trim()
              .replace(/^\uFEFF/, "") // Remove BOM se existir
              .replace(/\s+/g, " ") // Substitui múltiplos espaços por um único espaço
              .trim();
            
            // Log para depuração
            if (index === 0) {
              console.log(`Processando chave: '${key}' -> '${cleanKey}'`);
            }
            
            // Mapeia para os nomes de coluna esperados (case insensitive)
            const lowerKey = cleanKey.toLowerCase();
            
            if (lowerKey.includes('ok') && lowerKey.includes('list')) {
              cleanKey = 'ok_list';
            } else if (lowerKey.includes('agencia') || lowerKey.includes('regulat')) {
              cleanKey = 'regulatory_agency';
            } else if (lowerKey.includes('local') && lowerKey.includes('status')) {
              cleanKey = 'local_status';
            } else if (lowerKey.includes('cb') && lowerKey.includes('status')) {
              cleanKey = 'cb_status';
            } else {
              // Para outras colunas, usa a lógica original
              cleanKey = cleanKey
                .replace(/\s+/g, "_")
                .replace(/[^\w_]/g, "")
                .toLowerCase();
            }
            
            // Log para depuração
            if (index === 0 && (cleanKey === 'ok_list' || cleanKey === 'regulatory_agency' || 
                               cleanKey === 'local_status' || cleanKey === 'cb_status')) {
              console.log(`Mapeando '${key}' -> '${cleanKey}' com valor:`, row[key]);
            }
            
            clean[cleanKey] = row[key];
          }
          
          // Log para depuração - verificar as chaves normalizadas
          if (row.cluster && row.cluster.includes('Alimentos')) { // Apenas para depuração
            console.log('Linha de exemplo após normalização:', clean);
          }
          
          return clean;
        });
        
        // Verificar se a coluna de idioma existe
        const firstRow = normalizedRows[0];
        const hasLanguageColumn = firstRow && 'language' in firstRow;
        console.log('Contém coluna de idioma?', hasLanguageColumn);

        // Extrair categorias L0 únicas por idioma
        const byLanguage = {};
        
        if (hasLanguageColumn) {
          // Se a coluna de idioma existe, agrupar por idioma
          normalizedRows.forEach(row => {
            const language = row.language?.trim() || 'English';
            const l0 = row.cluster?.trim();
            
            if (!byLanguage[language]) {
              byLanguage[language] = { L0: new Set() };
            }
            
            if (l0) {
              byLanguage[language].L0.add(l0);
            }
          });
        } else {
          // Se não houver coluna de idioma, usar todos os dados em um único idioma
          const defaultLanguage = 'Português';
          byLanguage[defaultLanguage] = { L0: new Set() };
          
          normalizedRows.forEach(row => {
            const l0 = row.cluster?.trim();
            if (l0) {
              byLanguage[defaultLanguage].L0.add(l0);
            }
          });
        }
        
        // Converter Sets para Arrays
        Object.keys(byLanguage).forEach(lang => {
          byLanguage[lang].L0 = Array.from(byLanguage[lang].L0);
        });
        
        console.log('Idiomas disponíveis:', Object.keys(byLanguage));

        // Extrair categorias L0 únicas (todas)
        const l0Categories = [...new Set(
          normalizedRows
            .map(row => row.cluster?.trim())
            .filter(Boolean)
        )];

        // Mapear categorias por nível
        const l1Categories = {};
        const l2Categories = {};
        const l3Categories = {};
        const l4Categories = {};
        const l5Categories = {};

        normalizedRows.forEach(row => {
          const l0 = row.cluster?.trim();
          
          // L1 Categories
          const l1Id = row.level1_global_be_category_id?.trim();
          const l1Name = row.level1_global_be_category?.trim();
          if (l0 && l1Id && l1Name) {
            if (!l1Categories[l0]) l1Categories[l0] = new Set();
            l1Categories[l0].add(`${l1Id} - ${l1Name}`);
          }
          
          // L2 Categories
          const l2Id = row.level2_global_be_category_id?.trim();
          const l2Name = row.level2_global_be_category?.trim();
          const l1Key = l0 && l1Id && l1Name ? `${l0}__${l1Id} - ${l1Name}` : null;
          if (l1Key && l2Id && l2Name) {
            if (!l2Categories[l1Key]) l2Categories[l1Key] = new Set();
            l2Categories[l1Key].add(`${l2Id} - ${l2Name}`);
          }
          
          // L3 Categories
          const l3Id = row.level3_global_be_category_id?.trim();
          const l3Name = row.level3_global_be_category?.trim();
          const l2Key = l1Key && l2Id && l2Name ? `${l1Key}__${l2Id} - ${l2Name}` : null;
          if (l2Key && l3Id && l3Name) {
            if (!l3Categories[l2Key]) l3Categories[l2Key] = new Set();
            l3Categories[l2Key].add(`${l3Id} - ${l3Name}`);
          }
          
          // L4 Categories
          const l4Id = row.level4_global_be_category_id?.trim();
          const l4Name = row.level4_global_be_category?.trim();
          const l3Key = l2Key && l3Id && l3Name ? `${l2Key}__${l3Id} - ${l3Name}` : null;
          if (l3Key && l4Id && l4Name) {
            if (!l4Categories[l3Key]) l4Categories[l3Key] = new Set();
            l4Categories[l3Key].add(`${l4Id} - ${l4Name}`);
          }
          
          // L5 Categories
          const l5Id = row.level5_global_be_category_id?.trim();
          const l5Name = row.level5_global_be_category?.trim();
          const l4Key = l3Key && l4Id && l4Name ? `${l3Key}__${l4Id} - ${l4Name}` : null;
          if (l4Key && l5Id && l5Name) {
            if (!l5Categories[l4Key]) l5Categories[l4Key] = new Set();
            l5Categories[l4Key].add(`${l5Id} - ${l5Name}`);
          }
        });

        // Converter Sets para Arrays
        const l1CategoriesFormatted = {};
        Object.keys(l1Categories).forEach(key => {
          l1CategoriesFormatted[key] = Array.from(l1Categories[key]);
        });

        // Converter todos os Sets para objetos com arrays
        const formatCategoryObject = (categoryObj) => {
          const formatted = {};
          Object.keys(categoryObj).forEach(key => {
            formatted[key] = Array.from(categoryObj[key]);
          });
          return formatted;
        };

        setCategories({
          L0: l0Categories,
          l1: formatCategoryObject(l1Categories),
          l2: formatCategoryObject(l2Categories),
          l3: formatCategoryObject(l3Categories),
          l4: formatCategoryObject(l4Categories),
          l5: formatCategoryObject(l5Categories),
          allData: normalizedRows, // Salvar todos os dados para busca
          byLanguage: byLanguage   // Categorias agrupadas por idioma
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

        <CategoryLevel>
          <CategoryHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%' }}>
              <h2 style={{ margin: 0, whiteSpace: 'nowrap' }}>Níveis de Categoria</h2>
              <div style={{ flex: 1, maxWidth: '500px' }}>
                <SearchBar>
                  <SearchInput 
                    type="text" 
                    placeholder="Pesquise por L0, ID L1 ou Nome L1..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: 0 }}
                  />
                  {searchTerm && searchResults.length > 0 && (
                    <SearchResults>
                      {searchResults.map((item, index) => (
                        <SearchResultItem 
                          key={`result-${index}`}
                          onClick={() => handleSearchSelect(item)}
                        >
                          <div><strong>L0:</strong> {item.L0 || ''}</div>
                          {item.L1 && <div><strong>L1:</strong> {item.L1}</div>}
                          {item.L2 && <div><strong>L2:</strong> {item.L2}</div>}
                          {item.L3 && <div><strong>L3:</strong> {item.L3}</div>}
                          {item.L4 && <div><strong>L4:</strong> {item.L4}</div>}
                          {item.L5 && <div><strong>L5:</strong> {item.L5}</div>}
                        </SearchResultItem>
                      ))}
                    </SearchResults>
                  )}
                </SearchBar>
              </div>
            </div>
          </CategoryHeader>
          <CategorySelector>
            <Select
              value={selected.language}
              onChange={(e) => handleSelectChange('language', e.target.value)}
            >
              <Option value="">Selecione o Idioma</Option>
              {availableLanguages.map((lang) => (
                <Option key={lang} value={lang}>
                  {lang}
                </Option>
              ))}
            </Select>

            <Select
              value={selected.L0}
              onChange={(e) => handleSelectChange('L0', e.target.value)}
              disabled={!selected.language}
            >
              <Option value="">Selecione o Cluster</Option>
              {getFilteredCategories('L0').map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>

            {filteredL1.length > 0 && (
              <Select
                value={selected.L1}
                onChange={(e) => handleSelectChange('L1', e.target.value)}
              >
                <Option value="">Selecione a L1</Option>
                {filteredL1.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            )}

            {filteredL2.length > 0 && (
              <Select
                value={selected.L2}
                onChange={(e) => handleSelectChange('L2', e.target.value)}
              >
                <Option value="">Selecione a L2</Option>
                {filteredL2.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            )}

            {filteredL3.length > 0 && (
              <Select
                value={selected.L3}
                onChange={(e) => handleSelectChange('L3', e.target.value)}
              >
                <Option value="">Selecione a L3</Option>
                {filteredL3.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            )}

            {filteredL4.length > 0 && (
              <Select
                value={selected.L4}
                onChange={(e) => handleSelectChange('L4', e.target.value)}
              >
                <Option value="">Selecione a L4</Option>
                {filteredL4.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            )}

            {filteredL5.length > 0 && (
              <Select
                value={selected.L5}
                onChange={(e) => handleSelectChange('L5', e.target.value)}
              >
                <Option value="">Selecione a L5</Option>
                {filteredL5.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            )}
          
          <DetailsContainer>
            <DescriptionSection>
              <h4>Descrição</h4>
              <div>
                <p>Categoria selecionada: <strong>{selected.L5 || selected.L4 || selected.L3 || selected.L2 || selected.L1 || selected.L0 || 'Nenhuma'}</strong></p>
                {(selected.L0 || selected.language) && (
                  <p>{categoryDescription}</p>
                )}
              </div>
            </DescriptionSection>
            
            <InfoSection>
              <InfoItem>
                <h4>Local Status</h4>
                <p>{categoryDetails.localStatus}</p>
              </InfoItem>
              
              <InfoItem>
                <h4>CB Status</h4>
                <p>{categoryDetails.cbStatus}</p>
              </InfoItem>
              
              <InfoItem>
                <h4>OK List</h4>
                <p>{categoryDetails.okList}</p>
              </InfoItem>
              
              <InfoItem>
                <h4>Agência Regulatória</h4>
                <p>{categoryDetails.regulatoryAgency}</p>
              </InfoItem>
            </InfoSection>
          </DetailsContainer>
          </CategorySelector>
        </CategoryLevel>
      </Conteudo>
    </Principal>
  );
}

export default PrincipalComponent;
