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
  max-width: 100%;
  margin: 0 0 0 0;
  position: relative;
  background: white;
  border-radius: 4px;
  margin-left: 500px;

  h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #333;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: #fff;
  
  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  &::placeholder {
    color: #6c757d;
    font-style: italic;
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
  min-width: 200px;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-bottom: 10px;
  height: 38px;
  box-sizing: border-box;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    background-color: #e9ecef;
    opacity: 1;
    cursor: not-allowed;
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
  width: 100%;
  min-width: 300px;
  max-width: 100%;
  box-sizing: border-box;
`;

export const CategoryLevel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;

  h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    color: #666;
    margin: 0;
    font-weight: 500;
  }`;

export const DescriptionContainer = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 15px;
  margin-top: 15px;
  
  h4 {
    font-size: 16px;
    color: #333;
    margin: 0 0 10px 0;
    font-weight: 600;
    border-bottom: 1px solid #e9ecef;
    padding-bottom: 8px;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: #212529;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 4px;
    border: 1px solid #e9ecef;
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

export const DetailsContainer = styled.div`
  display: flex;
  margin-top: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  background: white;
  width: 100%;
`;

export const DescriptionSection = styled.div`
  flex: 1;
  padding: 15px;
  border-right: 1px solid #e9ecef;
  min-width: 60%;
  
  h4 {
    font-size: 14px;
    color: #6c757d;
    margin: 0 0 10px 0;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: #212529;
  }
`;

export const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`;

export const SearchButton = styled.button`
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  margin-left: 10px;
  height: 32px;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;

  h2 {
    margin: 0;
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 500px;
`;

export const InfoItem = styled.div`
  flex: 1 0 50%;
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
  border-right: 1px solid #e9ecef;
  min-width: 200px;
  
  &:nth-child(odd) {
    border-right: none;
  }
  
  &:last-child, 
  &:nth-last-child(2):nth-child(odd) {
    border-bottom: none;
  }
  
  h4 {
    margin: 0 0 5px 0;
    font-size: 12px;
    color: #6c757d;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #666;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #212529;
    font-weight: 400;
    word-break: break-word;
  }
`;

export const DescriptionSectionContent = styled.div`
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




