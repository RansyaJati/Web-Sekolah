/**
 * CMS Service Layer — single abstraction between components and the API.
 *
 * Architecture: Component -> Service (this file) -> Laravel /api -> Database.
 * - No component should call fetch('/api/...') directly for CMS data.
 * - Query-level pagination/limit: never fetch-all then slice in the browser.
 * - Tiny TTL cache + in-flight dedup for rarely-changing data
 *   (programs, partners, settings) to survive traffic spikes.
 * - Paginated Laravel responses ({ data: [...] }) are unwrapped automatically.
 */

export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface NewsDetailDTO extends NewsDTO {
    content: string;
}

export interface ProgramDetailDTO extends ProgramDTO {
    competencies: string[] | null;
    career_prospects: string[] | null;
}

export interface SiteProfile {
    school_name?: string;
    phone?: string;
    email?: string;
    address?: string;
}

export interface ProfilSekolah {
    visi?: string;
    misi?: string[];
    sambutan?: string;
    sejarah_singkat?: string;
}

type QueryParams = Record<string, string | number | boolean | undefined>;

const cache = new Map<string, { expires: number; value: unknown }>();
const inflight = new Map<string, Promise<unknown>>();

// TTL per resource: rarely-changing data cached longer, PPDB/news fresher.
const TTL: Record<string, number> = {
    programs: 10 * 60_000,
    partners: 10 * 60_000,
    settings: 5 * 60_000,
    default: 60_000,
};

function buildUrl(path: string, params: QueryParams = {}): string {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== '') qs.set(k, String(v));
    }
    const suffix = qs.toString();
    return suffix ? `${path}?${suffix}` : path;
}

function cacheKey(url: string): string {
    return url;
}

function ttlFor(path: string): number {
    if (path.includes('/programs')) return TTL.programs;
    if (path.includes('/partners')) return TTL.partners;
    if (path.includes('/settings')) return TTL.settings;
    return TTL.default;
}

function normalizeList<T>(json: unknown): T[] {
    if (Array.isArray(json)) return json as T[];
    if (json && typeof json === 'object' && Array.isArray((json as Paginated<T>).data)) {
        return (json as Paginated<T>).data;
    }
    return [];
}

async function getJSON<T>(path: string, params: QueryParams = {}, opts: { cache?: boolean } = {}): Promise<T> {
    const url = buildUrl(path, params);
    const useCache = opts.cache ?? true;

    if (useCache) {
        const hit = cache.get(cacheKey(url));
        if (hit && hit.expires > Date.now()) return hit.value as T;
        const ongoing = inflight.get(cacheKey(url));
        if (ongoing) return ongoing as Promise<T>;
    }

    const task = fetch(url, { headers: { Accept: 'application/json' } }).then(async (res) => {
        if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
        const json = (await res.json()) as T;
        if (useCache) cache.set(cacheKey(url), { expires: Date.now() + ttlFor(path), value: json });
        return json;
    });

    if (useCache) {
        inflight.set(cacheKey(url), task);
        try {
            return await task;
        } finally {
            inflight.delete(cacheKey(url));
        }
    }
    return task;
}

export function clearCmsCache(): void {
    cache.clear();
}

// --- Typed resource helpers (public website should use these) ---

export interface ProgramDTO {
    id: number;
    name: string;
    code: string;
    duration: string;
    description: string;
    image: string | null;
    is_active: boolean;
    is_featured: boolean;
}

export interface NewsDTO {
    id: number;
    title: string;
    slug: string;
    category: string;
    thumbnail: string | null;
    summary: string;
    status: string;
    is_featured: boolean;
    published_at: string;
    author: string;
}

export interface AchievementDTO {
    id: number;
    title: string;
    student_name: string;
    competition: string;
    level: string;
    year: string;
    rank: string;
    photo: string | null;
    description: string | null;
    is_featured: boolean;
}

export interface ProductDTO {
    id: number;
    name: string;
    category: string;
    description: string;
    image: string | null;
    features: string[] | null;
    price: string | null;
    is_available: boolean;
}

export interface JobDTO {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    category: string;
    description: string;
    posted_date: string;
    deadline_date: string | null;
}

export interface PartnerDTO {
    id: number;
    name: string;
    sector: string;
    description: string;
    partner_since: string | null;
}

export const cmsService = {
    async getPrograms(params: { active?: boolean; featured?: boolean; limit?: number } = {}): Promise<ProgramDTO[]> {
        const json = await getJSON<ProgramDTO[] | Paginated<ProgramDTO>>('/api/programs', {
            active: params.active ?? true,
            featured: params.featured,
            limit: params.limit ?? 24,
        });
        return normalizeList<ProgramDTO>(json);
    },

    async getNews(params: { status?: string; featured?: boolean; limit?: number; search?: string } = {}): Promise<NewsDTO[]> {
        const json = await getJSON<NewsDTO[] | Paginated<NewsDTO>>(
            '/api/news',
            { status: params.status ?? 'Published', featured: params.featured, limit: params.limit ?? 10, search: params.search },
            { cache: !params.search },
        );
        return normalizeList<NewsDTO>(json);
    },

    async getAchievements(params: { featured?: boolean; limit?: number } = {}): Promise<AchievementDTO[]> {
        const json = await getJSON<AchievementDTO[] | Paginated<AchievementDTO>>('/api/achievements', {
            featured: params.featured,
            limit: params.limit ?? 10,
        });
        return normalizeList<AchievementDTO>(json);
    },

    async getProducts(params: { category?: string; limit?: number } = {}): Promise<ProductDTO[]> {
        const json = await getJSON<ProductDTO[] | Paginated<ProductDTO>>('/api/products', {
            available: true,
            category: params.category,
            limit: params.limit ?? 24,
        });
        return normalizeList<ProductDTO>(json);
    },

    async getJobs(params: { category?: string; limit?: number } = {}): Promise<JobDTO[]> {
        const json = await getJSON<JobDTO[] | Paginated<JobDTO>>('/api/jobs', {
            active: true,
            category: params.category,
            limit: params.limit ?? 24,
        });
        return normalizeList<JobDTO>(json);
    },

    async getPartners(): Promise<PartnerDTO[]> {
        const json = await getJSON<PartnerDTO[]>('/api/partners', { active: true, limit: 24 });
        return normalizeList<PartnerDTO>(json);
    },

    /** Batch settings fetch: 1 request instead of N (PPDB previously fired 5). */
    async getSettingsBatch<T extends Record<string, unknown>>(keys: string[]): Promise<Partial<T>> {
        const json = await getJSON<Partial<T>>('/api/settings', { keys: keys.join(',') });
        return json ?? {};
    },

    /** Server-side paginated news (category tabs + search + page). */
    async listNews(params: {
        page?: number;
        perPage?: number;
        category?: string;
        search?: string;
        status?: string;
    } = {}): Promise<Paginated<NewsDTO>> {
        const json = await getJSON<Paginated<NewsDTO>>(
            '/api/news',
            {
                per_page: params.perPage ?? 9,
                page: params.page ?? 1,
                category: params.category,
                search: params.search,
                status: params.status ?? 'Published',
            },
            { cache: !params.search && (params.page ?? 1) === 1 },
        );
        if (Array.isArray(json)) return { data: json, current_page: 1, last_page: 1, per_page: json.length, total: json.length };
        return json;
    },

    async getNewsDetail(id: string | number): Promise<NewsDetailDTO> {
        return getJSON<NewsDetailDTO>(`/api/news/${id}`, {}, { cache: false });
    },

    async getProgramDetail(id: string | number): Promise<ProgramDetailDTO> {
        return getJSON<ProgramDetailDTO>(`/api/programs/${id}`);
    },
};
