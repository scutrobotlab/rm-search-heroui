import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import AboutPage from "@/pages/about";
import SearchPage from "@/pages/search";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SearchPage />} path="/search/*" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
