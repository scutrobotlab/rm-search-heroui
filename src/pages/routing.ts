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
  hitsPerPage: "10",
};

const encodedCategoriesLvl0 = {
  history: "历史数据",
  unknown: "未分类",
  newbie: "新手任务",
  mechanical: "机械",
  embedded: "嵌入式",
  algorithm: "算法",
  hardware: "硬件",
  others: "其他",
  software: "软件",
  management: "管理",
  "tech-review": "技术评审",
  operation: "运营",
  official: "官方信息",
  "tactical-strategy": "战术策略",
} as const;

type EncodedCategoriesLvl0 = typeof encodedCategoriesLvl0;
type DecodedCategoriesLvl0 = {
  [K in keyof EncodedCategoriesLvl0 as EncodedCategoriesLvl0[K]]: K;
};

const encodedCategoriesLvl1 = {
  history: "历史数据",
  unknown: "未分类",
  simple: "简单",
  general: "一般",
  hard: "困难",
  standard: "步兵",
  engineering: "工程",
  others: "其他",
  utility: "实用工具",
  aerial: "空中机器人",
  sentry: "哨兵",
  hero: "英雄",
  "field-props": "场地道具",
  "dart-system": "飞镖系统",
  radar: "雷达",
  "tech-docs": "技术资料",
  "robot-hardware": "机器人硬件",
  "training-docs": "培训资料",
  simulator: "模拟器",
  "project-management": "项目管理",
  "organization-building": "组织建设",
  "culture-building": "文化建设",
  "mid-term-assessment": "中期进度考核",
  "complete-form-assessment": "完整形态考核",
  "season-planning": "赛季规划",
  "referee-system-assessment": "裁判系统考核",
  "rule-evaluation": "规则测评",
  publicity: "宣传",
  business: "招商",
  announcement: "公告",
  attachment: "附件",
  "tactical-strategy": "战术策略",
} as const;

type EncodedCategoriesLvl1 = typeof encodedCategoriesLvl1;
type DecodedCategoriesLvl1 = {
  [K in keyof EncodedCategoriesLvl1 as EncodedCategoriesLvl1[K]]: K;
};

const decodedCategoriesLvl0 = Object.keys(
  encodedCategoriesLvl0,
).reduce<DecodedCategoriesLvl0>((acc, key) => {
  const newKey = encodedCategoriesLvl0[key as keyof EncodedCategoriesLvl0];
  const newValue = key;

  return {
    ...acc,
    [newKey]: newValue,
  };
}, {} as any);

const decodedCategoriesLvl1 = Object.keys(
  encodedCategoriesLvl1,
).reduce<DecodedCategoriesLvl1>((acc, key) => {
  const newKey = encodedCategoriesLvl1[key as keyof EncodedCategoriesLvl1];
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
  const categoryParts = name.split("/");

  if (categoryParts.length === 1) {
    const encodedName =
      decodedCategoriesLvl0[name as keyof DecodedCategoriesLvl0] || name;

    return encodedName.split(" ").map(encodeURIComponent).join("+");
  } else if (categoryParts.length === 2) {
    const encodedName0 =
      decodedCategoriesLvl0[categoryParts[0] as keyof DecodedCategoriesLvl0] ||
      categoryParts[0];
    const encodedName1 =
      decodedCategoriesLvl1[categoryParts[1] as keyof DecodedCategoriesLvl1] ||
      categoryParts[1];

    return `${encodedName0}/${encodedName1}`;
  }

  return name;
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug: string): string {
  const categoryParts = slug.split("/");

  if (categoryParts.length === 1) {
    const decodedSlug =
      encodedCategoriesLvl0[slug as keyof EncodedCategoriesLvl0] || slug;

    return decodeURIComponent(decodedSlug.replace(/\+/g, " "));
  } else if (categoryParts.length === 2) {
    const decodedSlug0 =
      encodedCategoriesLvl0[categoryParts[0] as keyof EncodedCategoriesLvl0] ||
      categoryParts[0];
    const decodedSlug1 =
      encodedCategoriesLvl1[categoryParts[1] as keyof EncodedCategoriesLvl1] ||
      categoryParts[1];

    return `${decodeURIComponent(decodedSlug0)} > ${decodeURIComponent(decodedSlug1)}`;
  }

  return slug;
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
      queryParameters.query = routeState.query;
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
      const categoryParts = routeState.category.split("/");

      if (categoryParts.length === 1) {
        hierarchicalMenu["categories.lvl0"] = [routeState.category];
      } else if (categoryParts.length === 2) {
        hierarchicalMenu["categories.lvl0"] = [categoryParts[0]];
        hierarchicalMenu["categories.lvl1"] = [
          `${categoryParts[0]}/${categoryParts[1]}`,
        ];
      }
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
