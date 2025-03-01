import { useRef } from "react";
import {
  HierarchicalMenu,
  Hits,
  HitsPerPage,
  InstantSearch,
  Pagination,
  SearchBox,
  SortBy,
  RefinementList,
  Configure,
} from "react-instantsearch";
import Searchkit from "searchkit";
import Client from "@searchkit/instantsearch-client";

import DefaultLayout from "@/layouts/default";
import {
  ClearFilters,
  ClearFiltersMobile,
  NoResults,
  NoResultsBoundary,
  Panel,
  ResultsNumberMobile,
  SaveFiltersMobile,
} from "@/components";

import "instantsearch.css/themes/reset.css";

import "../styles/search.css";
import "../styles/search.theme.css";
import "../styles/search.mobile.css";
import "@/components/Pagination.css";
import { Hit } from "@/components/Hit.tsx";
import GetRouting from "@/pages/routing.ts";

const sk = new Searchkit({
  connection: {
    host: "/api",
  },
  search_settings: {
    highlight_attributes: ["title"],
    snippet_attributes: ["content:100"],
    search_attributes: [{ field: "title", weight: 5 }, "content"],
    result_attributes: [
      "id",
      "title",
      "content",
      "image",
      "url",
      "author_nickname",
      "author_avatar",
      "create_time",
    ],
    facet_attributes: [
      {
        attribute: "categories.lvl0",
        field: "category_lvl0.keyword",
        type: "string",
      },
      {
        attribute: "categories.lvl1",
        field: "category_lvl1.keyword",
        type: "string",
      },
      {
        attribute: "college_name",
        field: "college_name.keyword",
        type: "string",
      },
    ],
    sorting: {
      default: {
        field: "_score",
        order: "desc",
      },
      _create_time_asc: {
        field: "create_time",
        order: "asc",
      },
      _create_time_desc: {
        field: "create_time",
        order: "desc",
      },
    },
  },
});

const searchClient = Client(sk, {
  hooks: {
    beforeSearch: async (searchRequests) => {
      return searchRequests.map((sr) => {
        const originalQuery = sr.body.query;
        const newQuery = {
          function_score: {
            query: originalQuery,
            functions: [
              {
                filter: {
                  range: {
                    create_time: {
                      gte: "now-1095d",
                    },
                  },
                },
                gauss: {
                  create_time: {
                    origin: "now/d",
                    scale: "1095d",
                    offset: "30d",
                    decay: 0.5,
                  },
                },
              },
              {
                filter: {
                  range: {
                    create_time: {
                      lt: "now-1095d",
                    },
                  },
                },
                weight: 0.5,
              },
            ],
            score_mode: "first",
            boost_mode: "multiply",
          },
        };

        return {
          ...sr,
          body: {
            ...sr.body,
            query: newQuery,
          },
        };
      });
    },
  },
});

const indexName = "rm-search";
const routing = GetRouting(indexName);

export default function DocsPage() {
  return (
    <DefaultLayout>
      <Search />
    </DefaultLayout>
  );
}

export function Search() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef(null);

  function openFilters() {
    document.body.classList.add("filtering");
    window.scrollTo(0, 0);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("click", onClick);
  }

  function closeFilters() {
    document.body.classList.remove("filtering");
    containerRef.current!.scrollIntoView();
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("click", onClick);
  }

  function onKeyUp(event: { key: string }) {
    if (event.key !== "Escape") {
      return;
    }

    closeFilters();
  }

  function onClick(event: MouseEvent) {
    if (event.target !== headerRef.current) {
      return;
    }

    closeFilters();
  }

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

      <Configure
        attributesToSnippet={["content:10"]}
        removeWordsIfNoResults="allOptional"
        snippetEllipsisText="…"
      />

      <div>
        <main ref={containerRef} className="search-container">
          <div className="container-wrapper mt-6">
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <section className="container-filters" onKeyUp={onKeyUp}>
              <div className="container-header">
                <h2>筛选器</h2>

                <div className="clear-filters" data-layout="desktop">
                  <ClearFilters />
                </div>

                <div className="clear-filters" data-layout="mobile">
                  <ResultsNumberMobile />
                </div>
              </div>

              <div className="container-body text-sm">
                <Panel header="标签">
                  <HierarchicalMenu
                    showMore
                    attributes={["categories.lvl0", "categories.lvl1"]}
                    limit={8}
                  />
                </Panel>

                <Panel header="学校">
                  <RefinementList
                    searchable
                    showMore
                    attribute="college_name"
                    limit={8}
                  />
                </Panel>

                {/*<Panel header="Brands">*/}
                {/*  <RefinementList*/}
                {/*    attribute="brand"*/}
                {/*    searchable={true}*/}
                {/*    searchablePlaceholder="Search for brands…"*/}
                {/*  />*/}
                {/*</Panel>*/}

                {/*<Panel header="Price">*/}
                {/*  <PriceSlider attribute="price" />*/}
                {/*</Panel>*/}

                {/*<Panel header="Free shipping">*/}
                {/*  <ToggleRefinement*/}
                {/*    attribute="free_shipping"*/}
                {/*    label="Display only items with free shipping"*/}
                {/*    on={true}*/}
                {/*  />*/}
                {/*</Panel>*/}
              </div>
            </section>

            <footer className="container-filters-footer" data-layout="mobile">
              <div className="container-filters-footer-button-wrapper">
                <ClearFiltersMobile containerRef={containerRef} />
              </div>

              <div className="container-filters-footer-button-wrapper">
                <SaveFiltersMobile onClick={closeFilters} />
              </div>
            </footer>
          </div>

          <section className="container-results mt-6">
            <header className="container-header container-options">
              <SortBy
                className="container-option"
                items={[
                  {
                    label: "默认排序",
                    value: "rm-search",
                  },
                  {
                    label: "创建时间最新",
                    value: "rm-search_create_time_desc",
                  },
                  {
                    label: "创建时间最早",
                    value: "rm-search_create_time_asc",
                  },
                ]}
              />

              <HitsPerPage
                className="container-option"
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
              <Pagination padding={5} />
            </footer>
          </section>
        </main>
      </div>

      <aside data-layout="mobile">
        <button
          className="filters-button"
          data-action="open-overlay"
          onClick={openFilters}
        >
          <svg viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 1H1l5.6 6.3v4.37L9.4 13V7.3z"
              fill="none"
              fillRule="evenodd"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.29"
            />
          </svg>
          Filters
        </button>
      </aside>
    </InstantSearch>
  );
}
