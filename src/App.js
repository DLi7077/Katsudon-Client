import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LandingPage from "./Views/LandingPage";
import { PAGETHEME } from "./Constants/colors";
import * as dotenv from "dotenv";
dotenv.config();

function App() {
  return (
    <>
      <Navbar style={{ color: PAGETHEME.Blue }} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "100px",
        }}
      >
        <LandingPage style={{ color: PAGETHEME.Blue }} />
      </div>
      <Footer />
    </>
  );
}

export default App;
