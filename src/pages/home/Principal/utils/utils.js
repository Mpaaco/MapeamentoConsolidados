/**
 * Função para remover acentos e caracteres especiais de uma string.
 * @param {string} str - A string a ser normalizada.
 * @returns {string} A string normalizada.
 */
export const normalizeString = (str) => {
  if (!str) return '';
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .toLowerCase()
    .trim();
};
