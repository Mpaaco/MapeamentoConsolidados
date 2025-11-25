import { useState, useMemo } from "react";
import { normalizeString } from "../utils/utils";

/**
 * Hook personalizado para gerenciar a busca e os resultados.
 * @param {Array} allData - Todos os dados de categorias para busca.
 * @returns {Object} Um objeto contendo o termo de busca, os resultados e a função para selecionar um resultado.
 */
export function useSearch(allData) {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm || allData.length === 0) return [];

    const normalizedSearchTerm = normalizeString(searchTerm);

    const results = allData.filter(row => {
      const l0 = normalizeString(row.cluster);
      const l1Id = normalizeString(row.level1_global_be_category_id);
      const l1Name = normalizeString(row.level1_global_be_category);
      
      return (
        l0.includes(normalizedSearchTerm) ||
        l1Id.includes(normalizedSearchTerm) ||
        l1Name.includes(normalizedSearchTerm)
      );
    }).map(row => {
      // Formata o resultado para exibição
      const l1 = row.level1_global_be_category_id && row.level1_global_be_category 
        ? `${row.level1_global_be_category_id.trim()} - ${row.level1_global_be_category.trim()}`
        : '';
      const l2 = row.level2_global_be_category_id && row.level2_global_be_category 
        ? `${row.level2_global_be_category_id.trim()} - ${row.level2_global_be_category.trim()}`
        : '';
      const l3 = row.level3_global_be_category_id && row.level3_global_be_category 
        ? `${row.level3_global_be_category_id.trim()} - ${row.level3_global_be_category.trim()}`
        : '';
      const l4 = row.level4_global_be_category_id && row.level4_global_be_category 
        ? `${row.level4_global_be_category_id.trim()} - ${row.level4_global_be_category.trim()}`
        : '';
      const l5 = row.level5_global_be_category_id && row.level5_global_be_category 
        ? `${row.level5_global_be_category_id.trim()} - ${row.level5_global_be_category.trim()}`
        : '';

      return {
        L0: row.cluster?.trim(),
        L1: l1,
        L2: l2,
        L3: l3,
        L4: l4,
        L5: l5,
        language: row.language?.trim() || 'English'
      };
    });

    // Remove duplicatas
    const uniqueResults = Array.from(new Set(results.map(JSON.stringify))).map(JSON.parse);
    
    return uniqueResults;
  }, [searchTerm, allData]);

  // Função para selecionar um resultado de busca
  const handleSearchSelect = (item) => {
    setSearchTerm(''); // Limpa o termo de busca
    
    // Retorna o objeto de seleção para ser usado no hook de seleção
    return {
      language: item.language,
      L0: item.L0,
      L1: item.L1,
      L2: item.L2,
      L3: item.L3,
      L4: item.L4,
      L5: item.L5
    };
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    handleSearchSelect
  };
}
