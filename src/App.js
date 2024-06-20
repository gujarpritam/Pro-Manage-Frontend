import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserAuthPage from "./pages/UserAuthPage/UserAuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserAuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
