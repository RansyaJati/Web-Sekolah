/**
 * Admin Authentication & Session Service Abstraction
 * 
 * In production, this service communicates with Laravel's sanctum/session endpoints.
 * Currently provides an abstraction layer with local storage state to facilitate
 * development, testing, and easy swapping with real backend credentials.
 */

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: 'Super Admin' | 'Editor' | 'Admin PPDB' | 'Admin BKK' | 'Admin BLUD';
    avatar?: string;
}

const STORAGE_KEY = 'smkn1_admin_auth';

export const adminAuthService = {
    getUser(): AdminUser | null {
        if (typeof window === 'undefined') return null;
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            // Default demo authenticated session for seamless reviewing
            const defaultUser: AdminUser = {
                id: 'usr-1',
                name: 'Administrator Utama',
                email: 'admin@smkn1cimahi.sch.id',
                role: 'Super Admin',
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUser));
            return defaultUser;
        }
        try {
            return JSON.parse(stored);
        } catch {
            return null;
        }
    },

    login(email: string, _password: string): Promise<AdminUser> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!email) {
                    reject(new Error('Email tidak boleh kosong.'));
                    return;
                }
                const user: AdminUser = {
                    id: 'usr-' + Date.now(),
                    name: email.split('@')[0].toUpperCase(),
                    email,
                    role: email.includes('ppdb') ? 'Admin PPDB' :
                          email.includes('bkk') ? 'Admin BKK' :
                          email.includes('blud') ? 'Admin BLUD' :
                          email.includes('editor') ? 'Editor' : 'Super Admin',
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
                resolve(user);
            }, 600);
        });
    },

    logout(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY);
        }
    },

    isAuthenticated(): boolean {
        return this.getUser() !== null;
    }
};
