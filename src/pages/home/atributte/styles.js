import styled from 'styled-components';

export const AttributeContainer = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 100%;
  margin: 20px 0;
  font-family: 'Inter', sans-serif;
`;

export const Header = styled.div`
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 8px 0;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666666;
  margin: 0 0 20px 0;
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  font-size: 14px;
  color: #333333;
  outline: none;
  transition: border-color 0.2s;
  
  &::placeholder {
    color: #999999;
  }
  
  &:focus {
    border-color: #4A90E2;
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999999;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const Select = styled.select`
  flex: 1;
  min-width: 200px;
  padding: 10px 16px;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  font-size: 14px;
  color: #333333;
  background-color: #FFFFFF;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px auto;
  cursor: pointer;
  outline: none;
  
  &:focus {
    border-color: #4A90E2;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #E0E0E0;
  margin: 0 0 20px 0;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StatusLabel = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: #333333;
  margin: 0;
  text-transform: uppercase;
`;

export const StatusValue = styled.p`
  font-size: 14px;
  color: #333333;
  margin: 0;
`;
