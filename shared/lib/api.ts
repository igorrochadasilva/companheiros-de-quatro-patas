type ApiGetOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

function buildUrl(path: string, params?: ApiGetOptions["params"]): string {
  if (!params || Object.keys(params).length === 0) {
    return path;
  }
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  }
  const query = search.toString();
  return query ? `${path}?${query}` : path;
}

/**
 * GET com JSON. Lança em !res.ok.
 * Use em services; centraliza headers, tratamento de erro e parsing.
 */
export async function apiGet<T>(
  url: string,
  options?: ApiGetOptions,
): Promise<T> {
  const { params, ...init } = options ?? {};
  const fullUrl = buildUrl(url, params);

  const res = await fetch(fullUrl, {
    ...init,
    method: "GET",
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const message = `Request failed: ${res.status} ${res.statusText}`;
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = await res.text();
    }
    throw new Error(message, { cause: { status: res.status, body } });
  }

  return res.json() as Promise<T>;
}
