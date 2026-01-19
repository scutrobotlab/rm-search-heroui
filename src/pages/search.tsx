import { useRef } from "react";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { Spacer } from "@heroui/react";
import SortBy from "@/components/SortBy.tsx";
import HitsPerPage from "@/components/HitsPerPage.tsx";
import Pagination from "@/components/Pagination.tsx";

import { NoResults, NoResultsBoundary } from "@/components";

import "instantsearch.css/themes/reset.css";

import "../styles/search.css";
import "../styles/search.theme.css";
import "../styles/search.mobile.css";
import { Hit } from "@/components/Hit.tsx";
import GetRouting from "@/pages/routing.ts";
import QueryInput from "@/components/QueryInput.tsx";
import { Loading } from "@/components/Loading.tsx";
import Stats from "@/components/Stats.tsx";
import SearchFilter from "@/components/SearchFilter.tsx";
import FilterFloatButton from "@/components/FilterFloatButton.tsx";
import FilterChips from "@/components/FilterChips.tsx";
import { useMediaQuery } from "usehooks-ts";

const { searchClient } = instantMeiliSearch("http://localhost:7700", "", {
  httpClient: async (url, opts) => {
    const path = (url as URL).pathname;
    const response = await fetch(`/api/ms${path}`, opts);

    const text = await response.text();

    return JSON.parse(text);
  },
  placeholderSearch: false,
  primaryKey: "id",
  keepZeroFacets: false,
  finitePagination: true,
  meiliSearchParams: {
    attributesToSearchOn: ["title", "content"],
    attributesToHighlight: ["title", "content"],
    attributesToRetrieve: ["*"],
    attributesToCrop: ["content:100"],
    facets: [
      "source",
      "college_name",
      "category_lvl0",
      "category_lvl1",
      "create_time",
    ],
    showRankingScore: true,
  },
});

const indexName = "rm-search";
const routing = GetRouting(indexName);

export default function Search() {
  const containerRef = useRef<HTMLElement>(null);

  // const isMobile = innerWidth < 900;
  // reactive
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <InstantSearch
      indexName={indexName}
      insights={false}
      routing={routing}
      searchClient={searchClient}
    >
      <SearchBox
        placeholder="搜索..."
        style={{
          display: "none",
        }}
      />

      <Loading />

      {isMobile && (
        <div className="px-4">
          <QueryInput size={"lg"} />
        </div>
      )}

      <Stats />

      <Configure
        attributesToSnippet={["content:10"]}
        removeWordsIfNoResults="allOptional"
        snippetEllipsisText="…"
        sortBy="create_time:desc"
      />

      <FilterChips />

      <div>
        <main ref={containerRef} className="search-container">
          <div className="container-wrapper mt-6">
            <section className="container-filters">
              <SearchFilter />
            </section>
          </div>

          <section className="container-results mt-6">
            <header className="container-header container-options">
              <SortBy
                items={[
                  {
                    label: "默认排序",
                    value: "rm-search",
                  },
                  {
                    label: "创建时间最新",
                    value: "rm-search:create_time:desc",
                  },
                  {
                    label: "创建时间最早",
                    value: "rm-search:create_time:asc",
                  },
                ]}
              />

              <Spacer x={4} />

              <HitsPerPage
                items={[
                  {
                    label: "每页 10 条记录",
                    value: 10,
                    default: true,
                  },
                  {
                    label: "每页 20 条记录",
                    value: 20,
                  },
                  {
                    label: "每页 40 条记录",
                    value: 40,
                  },
                ]}
              />
            </header>

            <NoResultsBoundary fallback={<NoResults />}>
              <Hits hitComponent={Hit} />
            </NoResultsBoundary>

            <footer className="container-footer">
              <Pagination />
            </footer>
          </section>
        </main>
      </div>

      {isMobile && <FilterFloatButton />}
    </InstantSearch>
  );
}
