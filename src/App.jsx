import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage pageNumber={pageNumber} setPageNumber={setPageNumber} />
          }
        />
        <Route
          path="search"
          element={
            <SearchPage pageNumber={pageNumber} setPageNumber={setPageNumber} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
