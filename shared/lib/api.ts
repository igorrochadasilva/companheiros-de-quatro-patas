type ApiGetOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

type ApiJsonOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

type ApiBody = Record<string, unknown> | unknown[] | null | undefined;

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
  return apiJsonRequest<T>(fullUrl, { ...init, method: "GET" });
}

async function apiJsonRequest<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      ...options?.headers,
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

export async function apiPost<T>(
  url: string,
  body?: ApiBody,
  options?: ApiJsonOptions,
): Promise<T> {
  const { params, ...init } = options ?? {};
  const fullUrl = buildUrl(url, params);
  return apiJsonRequest<T>(fullUrl, {
    ...init,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export async function apiPatch<T>(
  url: string,
  body?: ApiBody,
  options?: ApiJsonOptions,
): Promise<T> {
  const { params, ...init } = options ?? {};
  const fullUrl = buildUrl(url, params);
  return apiJsonRequest<T>(fullUrl, {
    ...init,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export async function apiDelete<T>(
  url: string,
  options?: ApiJsonOptions,
): Promise<T> {
  const { params, ...init } = options ?? {};
  const fullUrl = buildUrl(url, params);
  return apiJsonRequest<T>(fullUrl, {
    ...init,
    method: "DELETE",
  });
}
