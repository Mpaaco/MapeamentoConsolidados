import { useState, useEffect, useMemo } from "react";
import { normalizeString } from "../utils/utils";

/**
 * Hook personalizado para gerenciar a seleção de categorias e a lógica de filtragem.
 * @param {Object} categories - O objeto de categorias retornado por useCategories.
 * @returns {Object} Um objeto contendo o estado de seleção, a função de mudança, a descrição, os detalhes e as categorias filtradas.
 */
export function useCategorySelection(categories) {
  const [selected, setSelected] = useState({
    language: '',
    L0: '',
    L1: '',
    L2: '',
    L3: '',
    L4: '',
    L5: ''
  });
  const [categoryDescription, setCategoryDescription] = useState('não possui descrição');
  const [categoryDetails, setCategoryDetails] = useState({
    localStatus: 'N/A',
    cbStatus: 'N/A',
    okList: 'N/A',
    regulatoryAgency: 'N/A'
  });

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

      // Atualiza a descrição e detalhes
      if (selectedRow) {
        setCategoryDescription(selectedRow.describe?.trim() || 'não possui descrição');
        setCategoryDetails({
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

  // Função para obter categorias filtradas por nível
  const getFilteredCategories = (level) => {
    if (!selected.language) return [];
    
    if (level === 'L0') {
      return categories.byLanguage[selected.language]?.L0 || [];
    }
    
    // Para L1, a chave é o L0
    if (level === 'L1') {
      return selected.L0 ? categories.L1[selected.L0] || [] : [];
    }
    
    // Para L2, a chave é L0__L1
    if (level === 'L2') {
      const key = selected.L0 && selected.L1 ? `${selected.L0}__${selected.L1}` : null;
      return key ? categories.L2[key] || [] : [];
    }
    
    // Para L3, a chave é L0__L1__L2
    if (level === 'L3') {
      const key = selected.L0 && selected.L1 && selected.L2 ? `${selected.L0}__${selected.L1}__${selected.L2}` : null;
      return key ? categories.L3[key] || [] : [];
    }
    
    // Para L4, a chave é L0__L1__L2__L3
    if (level === 'L4') {
      const key = selected.L0 && selected.L1 && selected.L2 && selected.L3 ? `${selected.L0}__${selected.L1}__${selected.L2}__${selected.L3}` : null;
      return key ? categories.L4[key] || [] : [];
    }
    
    // Para L5, a chave é L0__L1__L2__L3__L4
    if (level === 'L5') {
      const key = selected.L0 && selected.L1 && selected.L2 && selected.L3 && selected.L4 ? `${selected.L0}__${selected.L1}__${selected.L2}__${selected.L3}__${selected.L4}` : null;
      return key ? categories.L5[key] || [] : [];
    }
    
    return [];
  };

  // Categorias filtradas para renderização
  const filteredL1 = useMemo(() => getFilteredCategories('L1'), [selected.language, selected.L0, categories]);
  const filteredL2 = useMemo(() => getFilteredCategories('L2'), [selected.language, selected.L0, selected.L1, categories]);
  const filteredL3 = useMemo(() => getFilteredCategories('L3'), [selected.language, selected.L0, selected.L1, selected.L2, categories]);
  const filteredL4 = useMemo(() => getFilteredCategories('L4'), [selected.language, selected.L0, selected.L1, selected.L2, selected.L3, categories]);
  const filteredL5 = useMemo(() => getFilteredCategories('L5'), [selected.language, selected.L0, selected.L1, selected.L2, selected.L3, selected.L4, categories]);

  return {
    selected,
    handleSelectChange,
    categoryDescription,
    categoryDetails,
    filteredL1,
    filteredL2,
    filteredL3,
    filteredL4,
    filteredL5,
    getFilteredCategories
  };
}
