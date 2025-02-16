import { useRef } from "react";
import {
  HierarchicalMenu,
  Hits,
  HitsPerPage,
  InstantSearch,
  Pagination,
  SearchBox,
  Highlight,
  Snippet,
  SortBy,
  RefinementList,
} from "react-instantsearch";
import Searchkit from "searchkit";
import Client from "@searchkit/instantsearch-client";

import getRouting from "./routing";

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
import { ScrollTo } from "@/components/ScrollTo";

import "instantsearch.css/themes/reset.css";

import "../styles/search.css";
import "../styles/search.theme.css";
import "../styles/search.mobile.css";
import "@/components/Pagination.css";

import type { Hit as AlgoliaHit } from "instantsearch.js";

const sk = new Searchkit({
  connection: {
    host: "/api",
    // if you are authenticating with api key
    // https://www.searchkit.co/docs/guides/setup-elasticsearch#connecting-with-api-key
    // apiKey: 'a2Rha1VJTUJMcGU4ajA3Tm9fZ0Y6MjAzX2pLbURTXy1hNm9SUGZGRlhJdw=='
    // if you are authenticating with username/password
    // https://www.searchkit.co/docs/guides/setup-elasticsearch#connecting-with-usernamepassword
    auth: {
      username: "elastic",
      password: "elastic",
    },
  },
  search_settings: {
    highlight_attributes: ["title"],
    snippet_attributes: ["content:100"],
    search_attributes: [{ field: "title", weight: 3 }, "content"],
    result_attributes: ["title", "content", "image"],
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
  },
});

const searchClient = Client(sk);

const indexName = "rm-search";
const routing = getRouting(indexName);

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
      routing
      indexName={indexName}
      insights={false}
      searchClient={searchClient}
    >
      <SearchBox
        placeholder="Product, brand, color, …"
        submitIconComponent={SubmitIcon}
      />

      {/*<Configure*/}
      {/*  attributesToSnippet={["content:10"]}*/}
      {/*  removeWordsIfNoResults="allOptional"*/}
      {/*  snippetEllipsisText="…"*/}
      {/*/>*/}

      <ScrollTo>
        <main ref={containerRef} className="search-container">
          <div className="container-wrapper">
            <section className="container-filters" onKeyUp={onKeyUp}>
              <div className="container-header">
                <h2>Filters</h2>

                <div className="clear-filters" data-layout="desktop">
                  <ClearFilters />
                </div>

                <div className="clear-filters" data-layout="mobile">
                  <ResultsNumberMobile />
                </div>
              </div>

              <div className="container-body">
                <Panel header="标签">
                  <HierarchicalMenu
                    attributes={["categories.lvl0", "categories.lvl1"]}
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

                {/*<Panel header="Ratings">*/}
                {/*  <Ratings attribute="rating" />*/}
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

          <section className="container-results">
            <header className="container-header container-options">
              <SortBy
                className="container-option"
                items={[
                  {
                    label: "Sort by featured",
                    value: "instant_search",
                  },
                  {
                    label: "Price ascending",
                    value: "instant_search_price_asc",
                  },
                  {
                    label: "Price descending",
                    value: "instant_search_price_desc",
                  },
                ]}
              />

              <HitsPerPage
                className="container-option"
                items={[
                  {
                    label: "16 hits per page",
                    value: 16,
                    default: true,
                  },
                  {
                    label: "32 hits per page",
                    value: 32,
                  },
                  {
                    label: "64 hits per page",
                    value: 64,
                  },
                ]}
              />
            </header>

            <NoResultsBoundary fallback={<NoResults />}>
              <Hits hitComponent={Hit} />
            </NoResultsBoundary>

            <footer className="container-footer">
              <Pagination padding={2} showFirst={false} showLast={false} />
            </footer>
          </section>
        </main>
      </ScrollTo>

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

function SubmitIcon() {
  return (
    <svg
      aria-hidden="true"
      height="16"
      viewBox="0 0 18 18"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.67"
        transform="translate(1 1)"
      >
        <circle cx="7.11" cy="7.11" r="7.11" />
        <path d="M16 16l-3.87-3.87" />
      </g>
    </svg>
  );
}

type HitType = AlgoliaHit<{
  title: string;
  content: string;
  image: string;
}>;

function Hit({ hit }: { hit: HitType }) {
  return (
    <article className="hit">
      <header className="hit-image-container">
        <img alt={hit.title} className="hit-image" src={hit.image} />
      </header>

      <div className="hit-info-container">
        <h1>
          <Highlight attribute="title" highlightedTagName="mark" hit={hit} />
        </h1>
        <p className="hit-description">
          <Snippet attribute="content" highlightedTagName="mark" hit={hit} />
        </p>

        <footer />
      </div>
    </article>
  );
}
