/* eslint complexity: off */

import type { UiState } from "instantsearch.js";

import { history as historyRouter } from "instantsearch.js/es/lib/routers";

type RouteState = {
  query?: string;
  page?: string;
  category?: string;
  sortBy?: string;
  hitsPerPage?: string;
};

const routeStateDefaultValues: RouteState = {
  query: "",
  page: "1",
  category: "",
  sortBy: "rm-search",
  hitsPerPage: "20",
};

const encodedCategories = {
  history: "历史数据",
  unknown: "未分类",
  newbie: "新手任务",
  mechanical: "机械",
  embedded: "嵌入式",
  algorithm: "算法",
  hardware: "硬件",
  other: "其他",
  software: "软件",
  management: "管理",
} as const;

type EncodedCategories = typeof encodedCategories;
type DecodedCategories = {
  [K in keyof EncodedCategories as EncodedCategories[K]]: K;
};

const decodedCategories = Object.keys(
  encodedCategories,
).reduce<DecodedCategories>((acc, key) => {
  const newKey = encodedCategories[key as keyof EncodedCategories];
  const newValue = key;

  return {
    ...acc,
    [newKey]: newValue,
  };
}, {} as any);

// Returns a slug from the category name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
function getCategorySlug(name: string): string {
  const encodedName =
    decodedCategories[name as keyof DecodedCategories] || name;

  return encodedName.split(" ").map(encodeURIComponent).join("+");
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug: string): string {
  const decodedSlug =
    encodedCategories[slug as keyof EncodedCategories] || slug;

  return decodeURIComponent(decodedSlug.replace(/\+/g, " "));
}

const originalWindowTitle = document.title;

const router = historyRouter<RouteState>({
  cleanUrlOnDispose: false,
  windowTitle({ category, query }) {
    const queryTitle = query ? `Results for "${query}"` : "";

    return [queryTitle, category, originalWindowTitle]
      .filter(Boolean)
      .join(" | ");
  },

  createURL({ qsModule, routeState, location }): string {
    const { protocol, hostname, port = "", pathname, hash } = location;
    const portWithPrefix = port === "" ? "" : `:${port}`;
    const urlParts = location.href.match(/^(.*?)\/search/);
    const baseUrl =
      (urlParts && urlParts[0]) ||
      `${protocol}//${hostname}${portWithPrefix}${pathname}search`;

    const categoryPath = routeState.category
      ? `${getCategorySlug(routeState.category)}/`
      : "";
    const queryParameters: Partial<RouteState> = {};

    if (
      routeState.query &&
      routeState.query !== routeStateDefaultValues.query
    ) {
      queryParameters.query = encodeURIComponent(routeState.query);
    }
    if (routeState.page && routeState.page !== routeStateDefaultValues.page) {
      queryParameters.page = routeState.page;
    }
    if (
      routeState.sortBy &&
      routeState.sortBy !== routeStateDefaultValues.sortBy
    ) {
      queryParameters.sortBy = routeState.sortBy;
    }
    if (
      routeState.hitsPerPage &&
      routeState.hitsPerPage !== routeStateDefaultValues.hitsPerPage
    ) {
      queryParameters.hitsPerPage = routeState.hitsPerPage;
    }

    const queryString = qsModule.stringify(queryParameters, {
      addQueryPrefix: true,
      arrayFormat: "repeat",
    });

    return `${baseUrl}/${categoryPath}${queryString}${hash}`;
  },

  parseURL({ qsModule, location }): RouteState {
    const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
    const category = getCategoryName(
      (pathnameMatches && pathnameMatches[1]) || "",
    );

    const queryParameters = qsModule.parse(location.search.slice(1));
    const { query = "", page = 1, hitsPerPage, sortBy } = queryParameters;

    return {
      category,
      query: decodeURIComponent(query as string),
      page: page as string,
      sortBy: sortBy as string,
      hitsPerPage: hitsPerPage as string,
    };
  },
});

const getStateMapping = ({ indexName }: { indexName: string }) => ({
  stateToRoute(uiState: UiState): RouteState {
    const indexUiState = uiState[indexName];

    return {
      query: indexUiState.query,
      page: (indexUiState.page && String(indexUiState.page)) || undefined,
      category:
        indexUiState.hierarchicalMenu &&
        indexUiState.hierarchicalMenu["categories.lvl0"] &&
        indexUiState.hierarchicalMenu["categories.lvl0"].join("/"),
      sortBy: indexUiState.sortBy,
      hitsPerPage:
        (indexUiState.hitsPerPage && String(indexUiState.hitsPerPage)) ||
        undefined,
    };
  },

  routeToState(routeState: RouteState): UiState {
    const hierarchicalMenu: { [key: string]: string[] } = {};

    if (routeState.category) {
      hierarchicalMenu["categories.lvl0"] = routeState.category.split("/");
    }

    const refinementList: { [key: string]: string[] } = {};

    const range: { [key: string]: string } = {};

    return {
      [indexName]: {
        query: routeState.query,
        page: Number(routeState.page),
        hierarchicalMenu,
        refinementList,
        range,
        sortBy: routeState.sortBy,
        hitsPerPage: Number(routeState.hitsPerPage),
      },
    };
  },
});

const GetRouting = (indexName: string) => ({
  router,
  stateMapping: getStateMapping({ indexName }),
});

export default GetRouting;
