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
  background: white;
  border-radius: 25px;
  padding: 10px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 450px;
  text-align: center;
  margin: 15px 0;

  p {
    margin: 0;
    color: #999;
    font-size: 14px;
  }
`;

export const CategorySelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 600px;
  margin-top: 20px;

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
  }

  .selector {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
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
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin-top: 30px;

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
`;

export const StatusTable = styled.table`
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
`;

