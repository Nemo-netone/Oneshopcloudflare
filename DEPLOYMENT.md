# 🚀 部署指南 - Cloudflare CN

## 📋 项目结构
- 前端: `artifacts/mobile` (React Native/Expo)
- 后端: `artifacts/api-server` (Express API)

---

## 🔧 前端部署 (Cloudflare Pages)

### 环境要求
- Node.js 18+
- pnpm
- Cloudflare 账户

### 部署步骤

1. **安装 Wrangler CLI**
```bash
npm install -g @cloudflare/wrangler
```

2. **登录 Cloudflare**
```bash
wrangler login
```

3. **构建前端应用**
```bash
cd artifacts/mobile
pnpm run build
```

4. **部署到 Cloudflare Pages**

   **方案A: 通过 GitHub 连接（推荐）**
   - 在 Cloudflare 控制面板
   - Pages > 创建项目 > 连接 GitHub
   - 选择仓库
   - 构建设置：
     - 框架预设: 其他
     - 构建命令: `pnpm --filter @workspace/mobile run build`
     - 构建输出目录: `dist` 或 `out`

   **方案B: CLI 部署**
   ```bash
   wrangler pages deploy dist
   ```

---

## 🔌 后端部署 (Express API)

### 方案 A: Cloudflare Workers (推荐)

**优点:**
- ✅ 无需服务器
- ✅ 全球边缘节点
- ✅ 自动扩展
- ✅ 免费额度充足

**步骤:**

1. **创建 Worker**
```bash
wrangler init oneshop-api
cd oneshop-api
```

2. **安装依赖**
```bash
npm install express cors cookie-parser drizzle-orm
```

3. **修改 src/index.ts**
```typescript
import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

// 从 Express 迁移代码到 Hono
app.get('/api/products', (c) => {
  return c.json({ products: [] })
})

export default app
```

4. **部署**
```bash
wrangler deploy
```

### 方案 B: 部署到云服务器

**支持的云平台:**
- 🇨🇳 阿里云 (ECS)
- 🇨🇳 腾讯云 (CVM)
- 🇨🇳 金山云 (ECS)
- 国际: AWS, Google Cloud, Azure

**步骤:**

1. **构建 Docker 镜像**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm run build
EXPOSE 8080
CMD ["node", "--enable-source-maps", "dist/index.mjs"]
```

2. **推送到云端**
```bash
docker build -t oneshop-api .
docker tag oneshop-api:latest your-registry/oneshop-api:latest
docker push your-registry/oneshop-api:latest
```

3. **在云服务器部署**
```bash
docker run -p 8080:8080 -e PORT=8080 your-registry/oneshop-api:latest
```

---

## 🔗 前后端连接

创建 `.env.production` 配置:

```env
# 前端
VITE_API_URL=https://api.example.com
REACT_APP_API_URL=https://api.example.com

# 后端
DATABASE_URL=your-db-url
PORT=8080
NODE_ENV=production
```

**CORS 配置 (后端):**
```typescript
// artifacts/api-server/src/index.ts
import cors from 'cors'

app.use(cors({
  origin: ['https://yourfrontend.pages.dev', 'https://example.com'],
  credentials: true
}))
```

---

## 📊 DNS & Cloudflare 配置

在 Cloudflare 控制面板:

1. **添加 DNS 记录**
   - 类型: CNAME
   - 名称: www
   - 内容: yourproject.pages.dev

2. **启用 SSL/TLS**
   - SSL/TLS > 概述 > 完全(严格)

3. **规则配置**
   - 页面规则 > URL 转发
   - 缓存规则

---

## 🗄️ 数据库

推荐使用:
- **Cloudflare D1** (SQLite) - 完全集成
- **Turso** (SQLite) - 最佳性能
- **Neon** (PostgreSQL) - 功能丰富
- **PlanetScale** (MySQL)

**环境变量示例:**
```env
# D1
D1_DATABASE_ID=xxx

# Turso
TURSO_CONNECTION_URL=libsql://xxx
TURSO_AUTH_TOKEN=xxx

# Neon
DATABASE_URL=postgresql://user:pass@host/db
```

---

## ✅ 部署检查清单

- [ ] 前端构建成功
- [ ] 后端环境变量配置完毕
- [ ] 数据库连接正确
- [ ] CORS 规则配置
- [ ] SSL 证书有效
- [ ] DNS 记录生效
- [ ] API 端点可访问
- [ ] 前后端连接正常

---

## 🆘 常见问题

**Q: 如何更新应用?**
```bash
git push origin main
# Cloudflare Pages 自动重新部署
```

**Q: 如何查看日志?**
```bash
# Workers 日志
wrangler tail

# Pages 日志
wrangler pages deployment list
```

**Q: 如何回滚版本?**
- Cloudflare 控制面板 > 部署历史 > 回滚

---

## 📚 参考资源

- [Cloudflare Pages](https://pages.cloudflare.com)
- [Cloudflare Workers](https://workers.cloudflare.com)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler)
- [Cloudflare D1](https://developers.cloudflare.com/d1)
