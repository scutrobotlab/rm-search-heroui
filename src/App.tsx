import { Route, Routes } from "react-router-dom";

import { Suspense, lazy } from "react";
import DefaultLayout from "@/layouts/default.tsx";
import { Spinner } from "@heroui/react";
const IndexPage = lazy(() => import("@/pages/index"));
const DocsPage = lazy(() => import("@/pages/docs"));
const AboutPage = lazy(() => import("@/pages/about"));
const SearchPage = lazy(() => import("@/pages/search"));
const MilestonePage = lazy(() => import("@/pages/milestone.tsx"));
const StatisticsPage = lazy(() => import("@/pages/statistics.tsx"));

function RouteLoading() {
  return (
     <div className="flex h-screen w-full items-center justify-center">
      <Spinner color="success" size="lg" />
    </div>
  );
}

function App() {
  return (
    <DefaultLayout>
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route element={<IndexPage />} path="/" />
          <Route element={<SearchPage />} path="/search/*" />
          <Route element={<DocsPage />} path="/docs" />
          <Route element={<AboutPage />} path="/about" />
          <Route element={<MilestonePage />} path="/milestone" />
          <Route element={<StatisticsPage />} path="/statistics" />
        </Routes>
      </Suspense>
    </DefaultLayout>
  );
}

export default App;
