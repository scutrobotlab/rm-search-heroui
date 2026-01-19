import { Route, Routes } from "react-router-dom";

import { Suspense, lazy } from "react";
import { Progress } from "@heroui/progress";
import DefaultLayout from "@/layouts/default.tsx";
const IndexPage = lazy(() => import("@/pages/index"));
const DocsPage = lazy(() => import("@/pages/docs"));
const AboutPage = lazy(() => import("@/pages/about"));
const SearchPage = lazy(() => import("@/pages/search"));
const MilestonePage = lazy(() => import("@/pages/milestone.tsx"));
const StatisticsPage = lazy(() => import("@/pages/statistics.tsx"));

function RouteLoading() {
  return (
    <Progress
      isIndeterminate
      aria-label="Loading..."
      className="max-w-md"
      size="sm"
    />
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
