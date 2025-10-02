import { BrowserRouter, Routes, Route } from "react-router-dom";
/*import HomePage from "./pages/HomePage";*/
import StudentCardPage from "./pages/StudentCardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentCardPage />} />
        <Route path="/carte" element={<StudentCardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
