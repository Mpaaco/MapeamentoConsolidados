import Sbar from "./slidebar"; 
import Principal from "./Principal";
import { Layout } from "./layoutStyles";

function Home() {
  return (
    <Layout>
      <Sbar />
      <Principal />
    </Layout>
  );
}

export default Home;
