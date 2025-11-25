import styled from "styled-components";

export const Principal = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
`;

export const Conteudo = styled.div`
display: flex;
align-items:center;
justify-content: space-between;
flex-direction: column;
gap: 25px;

`

export const Header = styled.header`
  h1 {
    font-size: 26px;
    color: #333;
    margin: 0;
    font-weight: 600;
  }
  h2 {
    font-size: 16px;
    color: #999;
    margin: 0;
    font-weight: 400;
  }
`;
export const MetricsContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const MetricCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 12px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  text-align: center;
  min-width: 110px;

  h3 {
    font-size: 11px;
    color: #0053DE;
    margin: 0 0 3px 0;
    font-weight: 500;
    line-height: 1.2;
  }

  p {
    font-size: 22px;
    color: #333;
    margin: 0;
    font-weight: 700;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &:focus {
    outline: none;
    border-color: #EE4D2D;
    box-shadow: 0 0 0 2px rgba(238, 77, 45, 0.2);
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 5px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const SearchResultItem = styled.div`
  padding: 12px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f0f0;
  
  &:hover {
    background-color: #f8f8f8;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  div {
    margin: 4px 0;
    
    strong {
      color: #333;
      margin-right: 5px;
    }
    background: transparent;
    font-size: 14px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background-color: white;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
  margin-bottom: 10px;

  &:hover {
    border-color: #EE4D2D;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const Option = styled.option`
  padding: 8px 12px;
  font-size: 14px;
  color: #333;
  background-color: white;
  
  &:disabled {
    color: #999;
    font-style: italic;
  }
`;

export const CategorySelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 800px;
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  h3 {
    font-size: 18px;
    color: #333;
    margin: 0 0 10px 0;
    font-weight: 600;
  }
`;

export const CategoryLevel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  p {
    font-size: 14px;
    color: #666;
    margin: 0;
    font-weight: 500;
  }`;

export const DescriptionContainer = styled.div`
  width: 800px;
  background: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-top: 15px;
  
  h4 {
    font-size: 18px;
    color: #333;
    margin: 0 0 15px 0;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    max-height: 150px;
    overflow-y: auto;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 4px;
    border: 1px solid #eee;
  }
  
  strong {
    color: #0053DE;
  }

  select {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 8px 12px;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover {
      border-color: #EE4D2D;
    }

    p {
      color: #333;
      font-weight: 400;
    }

    .arrow {
      color: #999;
      font-size: 12px;
    }
  }
`;

export const DescriptionSection = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;

  h4 {
    font-size: 16px;
    color: #333;
    margin: 0 0 10px 0;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    max-height: 150px;
    overflow-y: auto;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 4px;
    border: 1px solid #eee;
  }

  strong {
    color: #0053DE;
  }

  .descricaocont{
    display: flex;
    flex-direction: row;
    padding: 15px;

  }
  .description-text {
    flex: 1;
    h4 {
      font-size: 14px;
      color: #EE4D2D;
      margin: 0 0 5px 0;
      font-weight: 600;
    }
    p {
      font-size: 13px;
      color: #666;
      margin: 0;
      line-height: 1.5;
    }
  }
  .statustable{
  width: 250px;
  border-collapse: collapse;
  font-size: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  thead {
    background: #EE4D2D;
    color: white;
    th {
      padding: 8px;
      text-align: left;
      font-weight: 500;
    }
  }

  tbody {
    background: white;
    td {
      padding: 8px;
      border: 1px solid #f0f0f0;
      color: #333;
    }
  }
  }
`;




