/**
 * LINUX DO Seal badge Worker
 * GET /badge/:id.svg?w=180  → SVG with rewritten display size
 */

export interface Env {
  ASSETS: Fetcher;
}

const NATIVE_W = 309;
const NATIVE_H = 95;
const MIN_W = 80;
const MAX_W = 620;

type SealMeta = {
  id: string;
  file: string;
  title: string;
};

const SEALS: Record<string, SealMeta> = {
  "powered-by": {
    id: "powered-by",
    file: "seal-powered-by.svg",
    title: "Powered by LINUX DO",
  },
  "loved-by": {
    id: "loved-by",
    file: "seal-loved-by.svg",
    title: "Loved by LINUX DO",
  },
  "born-in": {
    id: "born-in",
    file: "seal-born-in.svg",
    title: "Born in LINUX DO",
  },
  "proudly-from": {
    id: "proudly-from",
    file: "seal-proudly-from.svg",
    title: "Proudly from LINUX DO",
  },
  "proud-member": {
    id: "proud-member",
    file: "seal-proud-member.svg",
    title: "Proud Member of LINUX DO",
  },
  "support-by": {
    id: "support-by",
    file: "seal-support-by.svg",
    title: "Supported by LINUX DO",
  },
  "best-community": {
    id: "best-community",
    file: "seal-best-community.svg",
    title: "Best Community · LINUX DO",
  },
  "pioneer-project": {
    id: "pioneer-project",
    file: "seal-pioneer-project.svg",
    title: "LINUX DO Pioneer Project",
  },
};

function clampWidth(raw: string | null): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) return 180;
  return Math.min(MAX_W, Math.max(MIN_W, Math.round(n)));
}

function heightFor(width: number): number {
  return Math.max(1, Math.round((width * NATIVE_H) / NATIVE_W));
}

function rewriteSvg(svg: string, width: number, height: number, title: string): string {
  let out = svg.replace(
    /<svg([^>]*)>/i,
    (_match, attrs: string) => {
      let next = attrs
        .replace(/\swidth="[^"]*"/i, "")
        .replace(/\sheight="[^"]*"/i, "");
      if (!/viewBox=/i.test(next)) {
        next += ` viewBox="0 0 ${NATIVE_W} ${NATIVE_H}"`;
      }
      return `<svg${next} width="${width}" height="${height}">`;
    },
  );

  if (/<title>[\s\S]*?<\/title>/i.test(out)) {
    out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  } else {
    out = out.replace(/<svg[^>]*>/i, (open) => `${open}\n    <title>${title}</title>`);
  }

  return out;
}

async function serveBadge(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const match = url.pathname.match(/^\/badge\/([a-z0-9-]+)\.svg$/i);
  if (!match) {
    return new Response("Not found", { status: 404 });
  }

  const seal = SEALS[match[1].toLowerCase()];
  if (!seal) {
    return new Response("Unknown seal", { status: 404 });
  }

  const width = clampWidth(url.searchParams.get("w"));
  const height = heightFor(width);

  const assetRes = await env.ASSETS.fetch(
    new Request(new URL(`/seals/${seal.file}`, url.origin), request),
  );
  if (!assetRes.ok) {
    return new Response("Seal asset missing", { status: 500 });
  }

  const svg = await assetRes.text();
  const body = rewriteSvg(svg, width, height, seal.title);

  return new Response(body, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/badge/")) {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response("Method not allowed", { status: 405 });
      }
      return serveBadge(request, env);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
