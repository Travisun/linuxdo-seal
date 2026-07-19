---
name: linuxdo-seal-badge
description: >-
  Adds LINUX DO community seal badges to a project's GitHub README or homepage.
  Use when the user asks to add a LINUX DO / LINUX.DO seal, community badge,
  社区徽章, 徽章战士, or embed linuxdo-seal.cuishushu.com badges.
---

# 徽章战士 · LINUX DO Seal

为任意开源项目 / 仓库 README / 项目主页添加 LINUX DO 社区徽章。

## 何时使用

- 用户提到：LINUX DO、LINUX.DO、社区徽章、seal badge、徽章战士
- 用户要求把社区归属展示到 GitHub README 或项目主页

## 硬性规则

1. **只用静态 SVG**，禁止 `?w=` 或 `/badge/` 动态地址。
2. 点击必须指向：`https://linux.do?ref=seal-click`，且 `target="_blank" rel="noopener noreferrer"`。
3. 尺寸只通过 HTML `width` / `height` 控制；原生比例 **309:95**（高度 ≈ 宽度 × 95 / 309）。
4. 图片基址：`https://linuxdo-seal.cuishushu.com/seals/seal-{id}.svg`

## 印章目录

| id | 文件 | title（hover / alt） |
| --- | --- | --- |
| `powered-by` | `seal-powered-by.svg` | Powered by LINUX DO |
| `loved-by` | `seal-loved-by.svg` | Loved by LINUX DO |
| `born-in` | `seal-born-in.svg` | Born in LINUX DO |
| `proudly-from` | `seal-proudly-from.svg` | Proudly from LINUX DO |
| `proud-member` | `seal-proud-member.svg` | Proud Member of LINUX DO |
| `support-by` | `seal-support-by.svg` | Supported by LINUX DO |
| `best-community` | `seal-best-community.svg` | Best Community · LINUX DO |
| `pioneer-project` | `seal-pioneer-project.svg` | LINUX DO Pioneer Project |

用户未指定时，默认使用 `powered-by`，宽度 `180`（高度 `55`）。

## 执行步骤（必须按序）

### 1. 确认目标文件

- GitHub 展示：优先 `README.md`（或用户指定的 README）
- 网页展示：用户指定的 HTML / 布局组件
- 若文件不存在：先创建最小 README，再嵌入徽章

### 2. 确认印章与尺寸

向用户确认，或采用默认：

- seal id：`powered-by`
- width：`180` → height：`55`

可选宽度常用：`120` / `160` / `180` / `220` / `280`（范围建议 80–620）。

### 3. 生成嵌入代码

模板（把 `{id}` `{title}` `{width}` `{height}` 替换掉）：

```html
<a href="https://linux.do?ref=seal-click" target="_blank" rel="noopener noreferrer" title="{title}">
  <img src="https://linuxdo-seal.cuishushu.com/seals/seal-{id}.svg" alt="{title}" width="{width}" height="{height}" />
</a>
```

示例（Powered by / 180）：

```html
<a href="https://linux.do?ref=seal-click" target="_blank" rel="noopener noreferrer" title="Powered by LINUX DO">
  <img src="https://linuxdo-seal.cuishushu.com/seals/seal-powered-by.svg" alt="Powered by LINUX DO" width="180" height="55" />
</a>
```

### 4. 写入项目

- **README.md**：把上述 HTML 片段放在靠前的可见位置（标题下方或徽章行）。GitHub 支持 README 内 HTML。
- **网页**：插入到页脚、关于区或品牌旁；保持可点击。
- 不要改写 SVG；不要本地拷贝除非用户明确要求离线资源。

### 5. 自检清单

- [ ] `src` 为 `https://linuxdo-seal.cuishushu.com/seals/seal-*.svg`（无 query）
- [ ] `href` 为 `https://linux.do?ref=seal-click`
- [ ] 含 `title` 与 `alt`（与印章文案一致）
- [ ] `width` / `height` 比例正确
- [ ] 在 README 或页面中可见

### 6. 回复用户

简短说明：已添加的印章类型、尺寸、文件路径；并给出在线工具链接：https://linuxdo-seal.cuishushu.com/

## 参考

- 工具页：https://linuxdo-seal.cuishushu.com/
- Skill 在线副本：https://linuxdo-seal.cuishushu.com/skills/linuxdo-seal-badge.md
- 仓库：https://github.com/Travisun/linuxdo-seal
- 机器索引：https://linuxdo-seal.cuishushu.com/llms.txt
