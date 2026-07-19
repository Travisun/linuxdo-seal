# LINUX DO Seal

基于 Cloudflare Worker 的窄版社区徽章引用工具。开源开发者与论坛用户可选择不同 Seal 类型与尺寸，一键复制 Markdown / HTML 嵌入代码，用于 GitHub README 或自有网页展示 LINUX DO 社区徽章。

**在线地址：** [https://linuxdo-seal.travistang.workers.dev](https://linuxdo-seal.travistang.workers.dev)

点击徽章将在新窗口打开 [https://linux.do?ref=seal-click](https://linux.do?ref=seal-click)。

## 功能

- 8 种 Seal：Powered by、Loved by、Born in、Proudly from、Proud Member、Supported by、Best Community、Pioneer Project
- 预设尺寸 + 自定义宽度（高度按比例自动计算）
- Markdown / HTML 嵌入代码一键复制
- `/badge/{id}.svg?w=宽度` 动态改写 SVG 展示尺寸（适合 README）
- 各 Seal 独立 hover / title 文案

## 快速使用

### Markdown（GitHub README）

```markdown
[![Powered by LINUX DO](https://linuxdo-seal.travistang.workers.dev/badge/powered-by.svg?w=180)](https://linux.do?ref=seal-click)
```

### HTML

```html
<a href="https://linux.do?ref=seal-click" target="_blank" rel="noopener noreferrer" title="Powered by LINUX DO">
  <img
    src="https://linuxdo-seal.travistang.workers.dev/badge/powered-by.svg?w=180"
    alt="Powered by LINUX DO"
    width="180"
    height="55"
  />
</a>
```

### 可用徽章 ID

| ID | Hover 文案 |
| --- | --- |
| `powered-by` | Powered by LINUX DO |
| `loved-by` | Loved by LINUX DO |
| `born-in` | Born in LINUX DO |
| `proudly-from` | Proudly from LINUX DO |
| `proud-member` | Proud Member of LINUX DO |
| `support-by` | Supported by LINUX DO |
| `best-community` | Best Community · LINUX DO |
| `pioneer-project` | LINUX DO Pioneer Project |

徽章 URL 格式：

```text
https://linuxdo-seal.travistang.workers.dev/badge/{id}.svg?w={width}
```

`w` 取值范围建议 `80`–`620`，默认 `180`。

## 本地开发

```bash
npm install
npm run dev
```

本地默认地址：`http://127.0.0.1:8787`

```bash
npm run deploy   # 手动部署到 Cloudflare
```

## 项目结构

```text
├── public/           # 静态资源与工具页
│   ├── index.html    # 徽章选择 / 代码生成界面
│   ├── seals/        # Seal SVG
│   ├── logo.svg
│   └── icon.svg
├── src/index.ts      # Worker：/badge/* SVG 尺寸重写
├── .github/workflows # push main 自动部署
└── wrangler.jsonc
```

## 自动部署

推送到 `main` 时，GitHub Actions 会通过 `cloudflare/wrangler-action` 部署 Worker。

需要在仓库 Secrets 中配置：

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`（权限模板：Edit Cloudflare Workers）

## License

[MIT](./LICENSE)
