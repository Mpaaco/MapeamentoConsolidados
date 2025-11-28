import { Search } from "react-feather";
import {
  AttributeContainer,
  Header,
  Title,
  Subtitle,
  SearchContainer,
  SearchInput,
  SearchIcon,
  FilterContainer,
  Select,
  Divider,
  StatusContainer,
  StatusLabel,
  StatusValue
} from "./styles";

const AttributeFilter = () => {
  return (
    <AttributeContainer>
      <Header>
        <Title>Mapeamento de Atributos</Title>
        <Subtitle>Explore as categorias usando seu atributo</Subtitle>
        <SearchContainer>
          <SearchIcon>
            <Search size={16} />
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Pesquise por L0, ID L1 ou Nome L1..." 
          />
        </SearchContainer>
      </Header>
      
      <FilterContainer>
        <Select name="idioma" defaultValue="">
          <option value="" disabled>Selecione o Idioma</option>
          <option value="english">English</option>
          <option value="portuguese">Português</option>
        </Select>
        <Select name="categoria" defaultValue="">
          <option value="" disabled>Selecione a Categoria</option>
          <option value="categoria1">Categoria 1</option>
          <option value="categoria2">Categoria 2</option>
        </Select>
        <Select name="atributo" defaultValue="">
          <option value="" disabled>Selecione o Atributo</option>
          <option value="atributo1">Atributo 1</option>
          <option value="atributo2">Atributo 2</option>
        </Select>
      </FilterContainer>
      
      <Divider />
      
      <StatusContainer>
        <StatusLabel>Status</StatusLabel>
        <StatusValue>Mandatório</StatusValue>
      </StatusContainer>
    </AttributeContainer>
  );
};

export default AttributeFilter;