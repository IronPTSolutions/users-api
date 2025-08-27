import { Route, Routes } from "react-router";
import { LoginPage } from "./pages";
import { Navbar } from "./components/ui";

function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App;
