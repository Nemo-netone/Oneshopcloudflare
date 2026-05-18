# 🧹 清理和重新安装依赖步骤

## 问题二已修复：React 18 版本锁定

已完成的改动：
- ✅ `pnpm-workspace.yaml` catalog 更新到 React 18.3.1
- ✅ `pnpm-workspace.yaml` overrides 强制 React 18
- ✅ `artifacts/mobile/package.json` @types/react 更新到 ~18.3.0

## 🔧 执行清理和重装步骤

### Windows/Mac/Linux 通用命令

```bash
# 1. 删除所有 node_modules 和锁文件
rm -rf node_modules pnpm-lock.yaml
find artifacts -name "node_modules" -type d -exec rm -rf {} +
find lib -name "node_modules" -type d -exec rm -rf {} +

# 2. 清理 pnpm store（可选但推荐）
pnpm store prune

# 3. 重新安装依赖
pnpm install

# 4. 验证 React 版本是否正确锁定
pnpm list react react-dom @types/react @types/react-dom
```

### Windows PowerShell 版本（如果上面命令失败）

```powershell
# 1. 删除 node_modules
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force pnpm-lock.yaml -ErrorAction SilentlyContinue
Get-ChildItem -Path artifacts,lib -Filter node_modules -Recurse -Directory | ForEach-Object { Remove-Item -Recurse -Force $_.FullName }

# 2. 清理 pnpm store
pnpm store prune

# 3. 重新安装
pnpm install

# 4. 验证版本
pnpm list react react-dom "@types/react" "@types/react-dom"
```

## ✅ 验证检查清单

执行重装后，验证以下内容：

```bash
# ✅ 检查 React 版本
pnpm list react
# 应该显示: react@18.3.1

# ✅ 检查 React 类型版本
pnpm list @types/react
# 应该显示: @types/react@18.3.x (不应该是 19.x)

# ✅ 构建前端确保没有 TS 错误
pnpm run build:mobile

# ✅ 构建后端
pnpm run build:api

# ✅ 完整 typecheck
pnpm run typecheck
```

## 🔍 如果仍有 React 19 残留

如果执行后仍看到 React 19：

```bash
# 深度清理
pnpm clean
rm -rf ~/.pnpm-store  # macOS/Linux

# 或在 Windows 上
$env:PNPM_HOME = "$env:APPDATA\pnpm"
Remove-Item -Recurse -Force $env:PNPM_HOME\store

# 再次安装
pnpm install
```

## 📝 预期结果

重装后应该看到：
- ✅ `react@18.3.1`
- ✅ `react-dom@18.3.1`
- ✅ `@types/react@18.3.x`
- ✅ `@types/react-dom@18.3.x`
- ❌ 没有任何 `react@19.x` 的引用
