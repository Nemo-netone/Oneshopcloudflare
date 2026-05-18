# 🔄 后端迁移评估方案

## 当前架构分析

**现有技术栈：**
- 框架：Express.js (Node.js)
- 日志：pino + pino-http
- 中间件：CORS、JSON 解析
- 打包：esbuild
- 依赖大小：适中（无大型库）

**特点：**
- ✅ 模块化结构（路由独立）
- ✅ 标准化日志（pino）
- ✅ 类型安全（TypeScript）
- ❌ 依赖原生 Node.js 模块（fs, http, net）
- ❌ 不兼容 Cloudflare Workers

---

## 两种部署方案对比

| 方案 | 框架 | 部署目标 | 冷启动 | 性能 | 成本 | 迁移难度 |
|------|------|--------|-------|------|------|--------|
| **A：Hono + Workers** | Hono.js | Cloudflare Workers | <100ms | ⭐⭐⭐⭐⭐ | 便宜 | 中等 |
| **B：Express + Docker** | Express | VPS/云服务器 | ~2s | ⭐⭐⭐ | 中等 | 简单 |

---

## 📋 方案 A：Hono + Cloudflare Workers ⭐ 推荐

### 优点
- ✅ **全球边缘部署** - 延迟 <50ms
- ✅ **自动扩展** - 无需管理服务器
- ✅ **成本低** - 200万请求/月免费额度
- ✅ **集成完美** - 与 Cloudflare Pages 无缝配合
- ✅ **无冷启动** - 响应速度快

### 缺点
- ❌ 学习曲线（Hono 框架）
- ❌ 某些 Node.js 模块不兼容
- ❌ 数据库连接需要特殊处理

### 迁移步骤

#### 1️⃣ 创建 Hono Workers 项目

```bash
# 在 artifacts 目录创建新项目
cd artifacts
npm create hono@latest api-server-hono
cd api-server-hono
```

#### 2️⃣ 迁移依赖

```bash
# package.json
{
  "name": "@workspace/api-server",
  "type": "module",
  "scripts": {
    "dev": "wrangler dev",
    "build": "wrangler build",
    "deploy": "wrangler deploy",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "hono": "^4.0.0",
    "@workspace/api-zod": "workspace:*",
    "@workspace/db": "workspace:*",
    "drizzle-orm": "catalog:"
  },
  "devDependencies": {
    "@types/node": "catalog:",
    "typescript": "~5.9.2",
    "wrangler": "^3.70.0"
  }
}
```

#### 3️⃣ 迁移代码示例

**原 Express 代码：**
```typescript
// artifacts/api-server/src/app.ts
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
```

**新 Hono 代码：**
```typescript
// artifacts/api-server-hono/src/index.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import router from "./routes";

const app = new Hono();

// 中间件
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["https://yourfrontend.pages.dev"],
    credentials: true,
  })
);

// 路由
app.route("/api", router);

// 健康检查
app.get("/health", (c) => c.json({ status: "ok" }));

export default app;
```

#### 4️⃣ 迁移路由

**Express 路由：**
```typescript
// 原格式
import { Router } from "express";

const router = Router();
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
```

**Hono 路由：**
```typescript
// 新格式 - 使用 HonoRoutes
import { Hono } from "hono";

const app = new Hono();

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

export default app;
```

#### 5️⃣ 日志适配

Hono 原生支持日志：

```typescript
import { logger } from "hono/logger";

app.use("*", logger());

// 或自定义日志
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  c.header("X-Response-Time", `${ms}ms`);
  console.log(`${c.req.method} ${c.req.path} - ${ms}ms`);
});
```

#### 6️⃣ 配置文件

**wrangler.toml：**
```toml
name = "oneshop-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

# 环境变量
[env.production]
vars = { ENVIRONMENT = "production" }

# 数据库绑定（如使用 D1）
[[d1_databases]]
binding = "DB"
database_name = "oneshop-db"
database_id = "xxx"

# KV 存储（可选）
[[kv_namespaces]]
binding = "CACHE"
id = "xxx"
```

#### 7️⃣ 部署

```bash
# 本地测试
pnpm run dev

# 部署到 Cloudflare
pnpm run deploy
```

---

## 📦 方案 B：Express + Docker 到 VPS

### 优点
- ✅ **零迁移成本** - 直接使用现有代码
- ✅ **完全兼容** - 所有 Node.js 模块可用
- ✅ **灵活部署** - 支持任何云平台
- ✅ **学习曲线低**

### 缺点
- ❌ 需要管理服务器
- ❌ 冷启动慢
- ❌ 成本较高
- ❌ 需要维护

### 部署步骤

#### 1️⃣ 创建 Dockerfile

```dockerfile
# artifacts/api-server/Dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制 pnpm 配置
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建
RUN pnpm --filter @workspace/api-server run build

# 暴露端口
EXPOSE 8080

# 启动
CMD ["node", "--enable-source-maps", "./dist/index.mjs"]
```

#### 2️⃣ 多阶段构建优化

```dockerfile
# artifacts/api-server/Dockerfile.optimized
# Stage 1: 构建
FROM node:18-alpine AS builder

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter @workspace/api-server run build

# Stage 2: 运行
FROM node:18-alpine

WORKDIR /app

# 仅复制必要文件
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/artifacts/api-server/dist ./dist
COPY --from=builder /app/artifacts/api-server/package.json ./

EXPOSE 8080

CMD ["node", "--enable-source-maps", "./dist/index.mjs"]
```

#### 3️⃣ Docker Compose（本地开发）

```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: artifacts/api-server/Dockerfile
    ports:
      - "8080:8080"
    environment:
      - PORT=8080
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:pass@db:5432/shop
    depends_on:
      - db
    volumes:
      - ./artifacts/api-server/src:/app/artifacts/api-server/src

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=shop
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### 4️⃣ 云平台部署选项

**选项 A：阿里云 ECS**
```bash
# 登录服务器
ssh root@your-server-ip

# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 构建镜像
docker build -f artifacts/api-server/Dockerfile -t oneshop-api:latest .

# 推送到镜像仓库
docker tag oneshop-api:latest registry.cn-hangzhou.aliyuncs.com/yourname/oneshop-api:latest
docker push registry.cn-hangzhou.aliyuncs.com/yourname/oneshop-api:latest

# 运行容器
docker run -d \
  -p 8080:8080 \
  -e PORT=8080 \
  -e NODE_ENV=production \
  -e DATABASE_URL=your-db-url \
  registry.cn-hangzhou.aliyuncs.com/yourname/oneshop-api:latest
```

**选项 B：腾讯云 CVM**
```bash
# 类似阿里云，使用腾讯镜像服务
docker tag oneshop-api:latest ccr.ccs.tencentyun.com/yourname/oneshop-api:latest
docker push ccr.ccs.tencentyun.com/yourname/oneshop-api:latest
```

**选项 C：Heroku（最简单）**
```bash
# 安装 Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# 登录
heroku login

# 创建应用
heroku create your-app-name

# 部署
git push heroku main
```

**选项 D：Railway（推荐）**
- 访问 https://railway.app
- 连接 GitHub 仓库
- 自动部署

#### 5️⃣ GitHub Actions CI/CD 部署

```yaml
# .github/workflows/deploy-api.yml
name: Deploy API

on:
  push:
    branches: [main]
    paths:
      - 'artifacts/api-server/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Build and push to registry
        uses: docker/build-push-action@v4
        with:
          context: .
          file: ./artifacts/api-server/Dockerfile
          push: true
          tags: |
            registry.cn-hangzhou.aliyuncs.com/yourname/oneshop-api:latest
            registry.cn-hangzhou.aliyuncs.com/yourname/oneshop-api:${{ github.sha }}
          registry: ${{ secrets.ALIYUN_REGISTRY }}
          username: ${{ secrets.ALIYUN_USERNAME }}
          password: ${{ secrets.ALIYUN_PASSWORD }}

      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: root
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            docker pull registry.cn-hangzhou.aliyuncs.com/yourname/oneshop-api:latest
            docker stop oneshop-api || true
            docker run -d \
              --name oneshop-api \
              -p 8080:8080 \
              -e DATABASE_URL=${{ secrets.DATABASE_URL }} \
              registry.cn-hangzhou.aliyuncs.com/yourname/oneshop-api:latest
```

---

## 🤔 我的建议

### 如果你：
- **需要最低成本 + 最佳性能** → 选择 **方案 A（Hono + Workers）**
  - 部署时间：<5分钟
  - 成本：$0-5/月
  
- **想保持现有代码 + 快速部署** → 选择 **方案 B（Docker）**
  - 部署时间：~30分钟
  - 成本：$5-50/月（取决于服务器）

### 混合方案 ⭐ 最优
```
前端 → Cloudflare Pages（静态资源）
  ↓
后端 API → Cloudflare Workers（Hono）
  ↓
数据库 → Turso / Neon / PlanetScale
```

---

## 📚 后续步骤

1. **选定方案** - 回复选择 A 或 B
2. **执行迁移** - 提供详细代码示例
3. **测试部署** - 本地验证后部署到生产
4. **监控告警** - 设置日志和监控

需要我继续提供某个方案的详细步骤吗？
