# RM Search 励志做全 RM 最好用的搜索引擎

![img](docs/logo.svg)

RM Search 是一个前后端分离的项目，当前仓库是后端仓库。

**README 的主要内容撰写在后端仓库，本仓库仅包含前端技术方案。**

**如果你希望继续深入了解 RM Search，请访问以下链接**

后端仓库 https://github.com/scutrobotlab/rm-search

## 技术方案

### 依赖工具、环境

- NodeJS 20
- Yarn 1.22

### 编译、安装方式

#### 安装依赖

```Bash
yarn
```

#### 本地运行

```Bash
yarn run dev
```

#### Docker 镜像

你也可以构建用于生产环境的 Docker 镜像。

```Bash
docker build -t rm-search-heroui:latest .
docker run -p 80:80 --name rm-search-heroui rm-search-heroui:latest
```

### 原理介绍

使用 Searchkit 调用 ElasticSearch API

https://www.searchkit.co/

Searchkit 是一个用于快速构建与 Elasticsearch 搜索体验的开源库！Searchkit 首次发布于 2015 年，已被许多公司用于生产环境中。Searchkit
是基于 Elasticsearch 的简单 API 构建的。