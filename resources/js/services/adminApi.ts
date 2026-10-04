/**
 * Admin API helper — all CMS mutations and protected reads go through here.
 * - Same-origin session cookie is sent by default (fetch credentials default).
 * - Accept: application/json so auth failures surface as 401 JSON, not redirects.
 * - X-XSRF-TOKEN header attached for mutations when the cookie exists.
 */

function csrfToken(): string {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
        Accept: 'application/json',
        ...((init.headers as Record<string, string>) ?? {}),
    };

    const method = (init.method ?? 'GET').toUpperCase();
    if (!['GET', 'HEAD'].includes(method) && !(init.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
        const token = csrfToken();
        if (token) headers['X-XSRF-TOKEN'] = token;
    }

    const res = await fetch(path, { ...init, headers });

    if (res.status === 401) {
        window.location.href = '/admin/login';
        throw new Error('Sesi berakhir. Mengalihkan ke halaman login...');
    }
    if (res.status === 403) {
        throw new Error('Akses ditolak untuk peran Anda.');
    }
    if (!res.ok) {
        throw new Error(`Request ${path} gagal: ${res.status}`);
    }

    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
}

export const adminApi = {
    get<T>(path: string): Promise<T> {
        return request<T>(path);
    },
    post<T>(path: string, body: unknown): Promise<T> {
        return request<T>(path, { method: 'POST', body: JSON.stringify(body) });
    },
    put<T>(path: string, body: unknown): Promise<T> {
        return request<T>(path, { method: 'PUT', body: JSON.stringify(body) });
    },
    del<T>(path: string): Promise<T> {
        return request<T>(path, { method: 'DELETE' });
    },
    upload<T>(path: string, form: FormData): Promise<T> {
        return request<T>(path, { method: 'POST', body: form });
    },
};

export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
}
