# LINUX DO Seal

基于 Cloudflare Worker Static Assets 的窄版社区徽章引用工具。三步选择印章与尺寸，复制嵌入代码，用于 GitHub README 或自有网页展示 LINUX DO 社区徽章。

**在线地址：** [https://linuxdo-seal.cuishushu.com](https://linuxdo-seal.cuishushu.com)

点击徽章将在新窗口打开 [https://linux.do?ref=seal-click](https://linux.do?ref=seal-click)。

## 功能

- 三步指引：选印章 → 选尺寸 → 复制代码
- 8 种 Seal，各自独立 hover / title 文案
- 预设尺寸 + 自定义宽度（高度按比例自动计算）
- 徽章为**静态 SVG**，由 CDN 长期缓存；尺寸通过 HTML `width` / `height` 控制，不消耗 Worker 动态执行

## 快速使用

图片始终引用静态文件，例如：

```text
https://linuxdo-seal.cuishushu.com/seals/seal-powered-by.svg
```

在 GitHub README 或网页中用 HTML 控制展示尺寸：

```html
<a href="https://linux.do?ref=seal-click" target="_blank" rel="noopener noreferrer" title="Powered by LINUX DO">
  <img
    src="https://linuxdo-seal.cuishushu.com/seals/seal-powered-by.svg"
    alt="Powered by LINUX DO"
    width="180"
    height="55"
  />
</a>
```

### 可用徽章

| 文件 | Hover 文案 |
| --- | --- |
| `seal-powered-by.svg` | Powered by LINUX DO |
| `seal-loved-by.svg` | Loved by LINUX DO |
| `seal-born-in.svg` | Born in LINUX DO |
| `seal-proudly-from.svg` | Proudly from LINUX DO |
| `seal-proud-member.svg` | Proud Member of LINUX DO |
| `seal-support-by.svg` | Supported by LINUX DO |
| `seal-best-community.svg` | Best Community · LINUX DO |
| `seal-pioneer-project.svg` | LINUX DO Pioneer Project |

路径：`/seals/{file}`

## 本地开发

```bash
npm install
npm run dev
```

本地默认地址：`http://127.0.0.1:8787`

```bash
npm run deploy
```

## 项目结构

```text
├── public/
│   ├── index.html    # 三步徽章工具页
│   ├── _headers      # 静态资源 CDN 缓存头
│   ├── seals/        # Seal SVG（静态）
│   ├── logo.svg
│   └── icon.svg
├── .github/workflows # push main 自动部署
└── wrangler.jsonc    # 纯 Static Assets + 自定义域名
```

## 自动部署

推送到 `main` 时，GitHub Actions 通过 `cloudflare/wrangler-action` 部署。

仓库 Secrets：

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`（权限模板：Edit Cloudflare Workers）

## 徽章战士 Skill（给 AI Agent）

Agent 为任意项目添加 LINUX DO 徽章时，请遵循：

- 仓库：[`.cursor/skills/linuxdo-seal-badge/SKILL.md`](./.cursor/skills/linuxdo-seal-badge/SKILL.md)
- 在线：https://linuxdo-seal.cuishushu.com/skills/linuxdo-seal-badge.md
- 机器索引：https://linuxdo-seal.cuishushu.com/llms.txt

核心规则：只用静态 `/seals/seal-{id}.svg`，用 HTML `width`/`height` 控尺寸，点击跳转 `https://linux.do?ref=seal-click`。

## License

[MIT](./LICENSE)
