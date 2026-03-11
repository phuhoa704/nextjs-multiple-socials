/**
 * Custom redux-persist storage that writes to both localStorage
 * and a document cookie so that Next.js Edge middleware can read the auth state.
 *
 * The cookie key is: `auth_persist`
 * Cookie is set as SameSite=Lax (suitable for most SSR/Edge scenarios).
 */

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds
const COOKIE_KEY = "auth_persist";

function setCookie(value: string): void {
  if (typeof document === "undefined") return;
  // We use a simple key name to avoid encoding issues with colons
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function removeCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
}

const cookieSyncStorage = {
  getItem: (key: string): Promise<string | null> => {
    return Promise.resolve(
      typeof localStorage !== "undefined" ? localStorage.getItem(key) : null,
    );
  },
  setItem: (key: string, value: string): Promise<void> => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
    }
    // Mirror the auth state to a cookie for the middleware
    setCookie(value);
    return Promise.resolve();
  },
  removeItem: (key: string): Promise<void> => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
    }
    removeCookie();
    return Promise.resolve();
  },
};

export default cookieSyncStorage;
