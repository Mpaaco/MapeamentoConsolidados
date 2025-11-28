import styled from 'styled-components';
import Sbar from "./slidebar"; 
import Principal from "./Principal";
import Atributte from "./atributte";
import { Layout } from "./layoutStyles";

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function Home() {
  return (
    <Layout>
      <Sbar />
      <MainContent>
        <ScrollableContent>
          <Principal />
          <Atributte />
        </ScrollableContent>
      </MainContent>
    </Layout>
  );
}

export default Home;
