import React, { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import { Search } from "react-feather";
import {
  AttributeContainer,
  Header,
  Title,
  Subtitle,
  SearchContainerA,
  SearchInputA,
  SearchIconA,
  FilterContainer,
  SelectA,
  Divider,
  StatusContainer,
  StatusLabel,
  StatusValue,
  LoadingText
} from "./styles";

// URL do Google Sheets (certifique-se de que o compartilhamento está como 'Qualquer pessoa com o link pode visualizar')
const CSV_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTKZKEmJcAQD9bOwvhkhNBTerdR8vHTKzH0trJR6MoE4ZyLp9p5ExMrM8FcmNdQIzuVv6GGKavRvA7S/pub?output=csv`;


const AttributeFilter = () => {
  // Estados para os dados e carregamento
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para as seleções
  const [selected, setSelected] = useState({
    language: '',
    category: '',
    attribute: '',
    status: ''
  });
  
  // Estados para os dados processados
  const [byLanguage, setByLanguage] = useState({});
  
  // Idiomas disponíveis
  const availableLanguages = useMemo(() => {
    const languages = new Set();
    allData.forEach(item => {
      if (item.language) {
        languages.add(item.language);
      }
    });
    return Array.from(languages).sort();
  }, [allData]);
  
  // Função para normalizar strings (remover acentos e caracteres especiais)
  const normalizeString = (str) => {
    if (!str) return '';
    return String(str)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .toLowerCase()
      .trim();
  };
  
  // Carrega os dados do CSV
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Iniciando carregamento do CSV...');
        
        const response = await fetch(CSV_URL);
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const csvText = await response.text();
        console.log('CSV baixado, tamanho:', csvText.length);
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log('Dados brutos do CSV (primeiros 2 itens):', results.data.slice(0, 2));
            
            // Processa os dados brutos
            const processedData = results.data
              .filter(item => {
                // Verifica se as colunas obrigatórias existem
                const hasRequiredFields = 
                  item && 
                  'Language' in item && 
                  'global_be_category_id' in item && 
                  'category' in item &&
                  'global_attribute_id' in item &&
                  'global_attribute' in item &&
                  'Status' in item;
                
                if (!hasRequiredFields) {
                  console.log('Linha com campos faltando:', item);
                  return false;
                }
                
                return true;
              })
              .map((item, index) => ({
                id: `row-${index}`,
                language: item.Language ? item.Language.trim() : '',
                categoryId: item.global_be_category_id ? item.global_be_category_id.toString().trim() : '',
                categoryName: item.category ? item.category.trim() : '',
                attributeId: item.global_attribute_id ? item.global_attribute_id.toString().trim() : '',
                attributeName: item.global_attribute ? item.global_attribute.trim() : '',
                status: item.Status ? item.Status.trim() : ''
              }));
            
            console.log('Dados processados (primeiros 2 itens):', processedData.slice(0, 2));
            
            // Organiza os dados por idioma
            const byLang = {};
            processedData.forEach(item => {
              const lang = item.language || 'English';
              if (!byLang[lang]) {
                byLang[lang] = {
                  categories: new Map(),
                  attributes: new Map()
                };
              }
              
              // Adiciona a categoria se não existir
              if (item.categoryId && item.categoryName) {
                const categoryKey = `${item.categoryId} - ${item.categoryName}`;
                if (!byLang[lang].categories.has(categoryKey)) {
                  byLang[lang].categories.set(categoryKey, {
                    id: item.categoryId,
                    name: item.categoryName,
                    attributes: new Map()
                  });
                }
                
                // Adiciona o atributo à categoria
                if (item.attributeId) {
                  const category = byLang[lang].categories.get(categoryKey);
                  const attributeKey = item.attributeName 
                    ? `${item.attributeId} - ${item.attributeName}`
                    : `Atributo ${item.attributeId}`;
                  
                  category.attributes.set(attributeKey, {
                    id: item.attributeId,
                    name: item.attributeName || `Atributo ${item.attributeId}`,
                    status: item.status || ''
                  });
                }
              }
            });
            
            console.log('Dados organizados por idioma:', byLang);
            
            setAllData(processedData);
            setByLanguage(byLang);
            setLoading(false);
          },
          error: (error) => {
            console.error('Erro ao processar o CSV:', error);
            setError('Erro ao processar o arquivo CSV');
            setLoading(false);
          }
        });
      } catch (err) {
        console.error('Erro ao carregar os dados:', err);
        setError('Erro ao carregar os dados. Verifique sua conexão e tente novamente.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Manipuladores de mudança de seleção
  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelected({
      language,
      category: '',
      attribute: '',
      status: ''
    });
  };
  
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelected(prev => ({
      ...prev,
      category,
      attribute: '',
      status: ''
    }));
  };
  
  const handleAttributeChange = (e) => {
    const attribute = e.target.value;
    let status = '';
    
    // Encontrar o status do atributo selecionado
    if (selected.language && byLanguage[selected.language]) {
      const languageData = byLanguage[selected.language];
      if (selected.category && languageData.categories.has(selected.category)) {
        const category = languageData.categories.get(selected.category);
        if (attribute && category.attributes.has(attribute)) {
          status = category.attributes.get(attribute).status;
        }
      }
    }
    
    setSelected(prev => ({
      ...prev,
      attribute,
      status
    }));
  };
  
  // Filtra as categorias com base no idioma selecionado
  const filteredCategories = useMemo(() => {
    if (!selected.language || !byLanguage[selected.language]) return [];
    return Array.from(byLanguage[selected.language].categories.keys()).sort();
  }, [selected.language, byLanguage]);
  
  // Filtra os atributos com base no idioma e categoria selecionados
  const filteredAttributes = useMemo(() => {
    if (!selected.language || !selected.category || !byLanguage[selected.language]) return [];
    
    const languageData = byLanguage[selected.language];
    const category = languageData.categories.get(selected.category);
    
    if (!category) return [];
    return Array.from(category.attributes.keys())
      .map(key => ({
        key,
        status: category.attributes.get(key).status || ''
      }))
      .sort((a, b) => a.key.localeCompare(b.key));
  }, [selected.language, selected.category, byLanguage]);
  
  // Função para buscar itens com base no termo de pesquisa
  const searchItems = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const normalizedTerm = normalizeString(searchTerm);
    
    return allData.filter(item => {
      return (
        normalizeString(item.language).includes(normalizedTerm) ||
        normalizeString(item.categoryName).includes(normalizedTerm) ||
        normalizeString(item.attributeName).includes(normalizedTerm) ||
        item.categoryId.includes(searchTerm) ||
        item.attributeId.includes(searchTerm)
      );
    });
  }, [searchTerm, allData]);
  
  if (loading) return <LoadingText>Carregando dados...</LoadingText>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <AttributeContainer>
      <Header>
        <Title>Mapeamento de Atributos</Title>
        <Subtitle>Explore as categorias usando seu atributo</Subtitle>
        <SearchContainerA>
          <SearchIconA>
            <Search size={16} />
          </SearchIconA>
          <SearchInputA 
            type="text" 
            placeholder="Pesquise por idioma, categoria ou atributo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainerA>
        
        {/* Resultados da busca */}
        {searchTerm && searchItems.length > 0 && (
          <div style={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            right: 0, 
            backgroundColor: 'white', 
            border: '1px solid #ccc',
            borderRadius: '4px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            {searchItems.map((item, index) => (
              <div 
                key={item.id} 
                style={{ 
                  padding: '10px', 
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                  '&:hover': {
                    backgroundColor: '#f0f0f0'
                  }
                }}
                onClick={() => {
                  const attributeKey = item.attributeId ? `${item.attributeId} - ${item.attributeName || `Atributo ${item.attributeId}`}` : '';
                  const categoryKey = item.categoryId ? `${item.categoryId} - ${item.categoryName}` : '';
                  const languageData = byLanguage[item.language];
                  let status = '';
                  
                  if (languageData) {
                    const category = languageData.categories.get(categoryKey);
                    if (category) {
                      const attribute = category.attributes.get(attributeKey);
                      if (attribute) {
                        status = attribute.status;
                      }
                    }
                  }
                  
                  setSelected({
                    language: item.language,
                    category: categoryKey,
                    attribute: attributeKey,
                    status: status
                  });
                  setSearchTerm('');
                }}
              >
                <div><strong>Idioma:</strong> {item.language}</div>
                <div><strong>Categoria:</strong> {item.categoryName} ({item.categoryId})</div>
                {item.attributeName && (
                  <div><strong>Atributo:</strong> {item.attributeName} ({item.attributeId})</div>
                )}
              </div>
            ))}
          </div>
        )}
      </Header>
      
      <FilterContainer>
        {/* Select de Idioma */}
        <SelectA
          name="idioma" 
          value={selected.language}
          onChange={handleLanguageChange}
        >
          <option value="" disabled>Selecione o Idioma</option>
          {availableLanguages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </SelectA>
        
        {/* Select de Categoria */}
        <SelectA
          name="categoria" 
          value={selected.category}
          onChange={handleCategoryChange}
          disabled={!selected.language}
        >
          <option value="" disabled>Selecione a Categoria</option>
          {filteredCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </SelectA>
        
        {/* Select de Atributo */}
        <SelectA 
          name="atributo" 
          value={selected.attribute}
          onChange={handleAttributeChange}
        >
          <option value="" disabled>Selecione o Atributo</option>
          {filteredAttributes.map(({key}, index) => (
            <option key={index} value={key}>
              {key}
            </option>
          ))}
        </SelectA>
      </FilterContainer>
      
      <Divider />
      
      <StatusContainer>
        <StatusLabel>Status:</StatusLabel>
        <StatusValue>
          {selected.attribute 
            ? (selected.status || 'Status não disponível')
            : 'Nenhum atributo selecionado'}
        </StatusValue>
      </StatusContainer>
    </AttributeContainer>
  );
};

export default AttributeFilter;