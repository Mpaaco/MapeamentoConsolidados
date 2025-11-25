import { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";

const categoryUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vScHy3wpOqOxIRNk6a32-IwhOmP4JSujEOErSxuFRX3z_fbIP3gDoctM_xKdkOTTcWt3OElQlfUWRkY/pub?gid=1580603037&single=true&output=csv";

/**
 * Função para normalizar os cabeçalhos das colunas do CSV.
 * @param {Object} row - A linha de dados bruta.
 * @param {number} index - O índice da linha.
 * @returns {Object} A linha com os cabeçalhos normalizados.
 */
const normalizeHeaders = (row, index) => {
  const clean = {};
  for (const key in row) {
    if (!key) continue;

    let cleanKey = key
      .toString()
      .trim()
      .replace(/^\uFEFF/, "")
      .replace(/\s+/g, " ")
      .trim();

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
      cleanKey = cleanKey
        .replace(/\s+/g, "_")
        .replace(/[^\w_]/g, "")
        .toLowerCase();
    }

    clean[cleanKey] = row[key];
  }
  return clean;
};

/**
 * Função para agrupar as categorias por nível e idioma.
 * @param {Array} normalizedRows - As linhas de dados com cabeçalhos normalizados.
 * @returns {Object} Um objeto contendo as categorias agrupadas.
 */
const groupCategories = (normalizedRows) => {
  const byLanguage = {};
  const l1Categories = {};
  const l2Categories = {};
  const l3Categories = {};
  const l4Categories = {};
  const l5Categories = {};
  
  const hasLanguageColumn = normalizedRows[0] && 'language' in normalizedRows[0];
  const defaultLanguage = 'Português';

  normalizedRows.forEach(row => {
    const language = hasLanguageColumn ? (row.language?.trim() || 'English') : defaultLanguage;
    const l0 = row.cluster?.trim();

    // Agrupamento por idioma (L0)
    if (!byLanguage[language]) {
      byLanguage[language] = { L0: new Set() };
    }
    if (l0) {
      byLanguage[language].L0.add(l0);
    }

    // Agrupamento por nível
    if (l0) {
      // L1 Categories
      const l1Id = row.level1_global_be_category_id?.trim();
      const l1Name = row.level1_global_be_category?.trim();
      if (l1Id && l1Name) {
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
    }
  });

  // Converter Sets para Arrays
  Object.keys(byLanguage).forEach(lang => {
    byLanguage[lang].L0 = Array.from(byLanguage[lang].L0).sort();
  });

  const formatCategoryObject = (categoryObj) => {
    const formatted = {};
    Object.keys(categoryObj).forEach(key => {
      formatted[key] = Array.from(categoryObj[key]).sort();
    });
    return formatted;
  };

  return {
    L1: formatCategoryObject(l1Categories),
    L2: formatCategoryObject(l2Categories),
    L3: formatCategoryObject(l3Categories),
    L4: formatCategoryObject(l4Categories),
    L5: formatCategoryObject(l5Categories),
    byLanguage,
  };
};

/**
 * Hook personalizado para carregar e gerenciar os dados de categorias.
 * @returns {Object} Um objeto contendo os dados de categorias e a lista completa.
 */
export function useCategories() {
  const [categories, setCategories] = useState({
    L1: {},
    L2: {},
    L3: {},
    L4: {},
    L5: {},
    allData: [],
    byLanguage: {}
  });

  useEffect(() => {
    Papa.parse(categoryUrl, {
      download: true,
      header: true,
      complete: (results) => {
        const normalizedRows = results.data.map(normalizeHeaders);
        const grouped = groupCategories(normalizedRows);

        setCategories({
          ...grouped,
          allData: normalizedRows,
        });
      },
      error: (err) => console.error("Erro ao carregar categorias:", err),
    });
  }, []);

  return categories;
}
