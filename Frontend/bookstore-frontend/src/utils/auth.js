/**
 * Authentication & Multi-Session Storage Utility
 * Supports isolated sessions per tab (via sessionStorage)
 * and preserves both Admin & Customer data in localStorage without overwriting.
 */

const STORAGE_KEYS = {
  ACTIVE_TAB_AUTH: "bookstore_active_auth",
  USER_PERSISTENT: "bookstore_user_auth",
  ADMIN_PERSISTENT: "bookstore_admin_auth",
};

/**
 * Get active auth session from current tab (sessionStorage),
 * with fallback to persistent role storage in localStorage.
 */
export const getAuthSession = () => {
  // 1. Check tab-scoped sessionStorage first (isolated per tab)
  try {
    const tabData = sessionStorage.getItem(STORAGE_KEYS.ACTIVE_TAB_AUTH);
    if (tabData) {
      const parsed = JSON.parse(tabData);
      if (parsed?.token && parsed?.role) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading sessionStorage:", err);
  }

  // 2. Fallback to localStorage standard or role-specific keys
  try {
    // Check legacy / direct keys
    const directToken = localStorage.getItem("token");
    const directEmail = localStorage.getItem("email");
    const directRole = localStorage.getItem("role");
    if (directToken && directRole) {
      return { token: directToken, email: directEmail, role: directRole };
    }

    // Check user persistent
    const userAuth = localStorage.getItem(STORAGE_KEYS.USER_PERSISTENT);
    if (userAuth) {
      return JSON.parse(userAuth);
    }

    // Check admin persistent
    const adminAuth = localStorage.getItem(STORAGE_KEYS.ADMIN_PERSISTENT);
    if (adminAuth) {
      return JSON.parse(adminAuth);
    }
  } catch (err) {
    console.error("Error reading localStorage:", err);
  }

  return null;
};

export const getAuthToken = () => {
  const session = getAuthSession();
  return session ? session.token : null;
};

export const getAuthEmail = () => {
  const session = getAuthSession();
  return session ? session.email : null;
};

export const getAuthRole = () => {
  const session = getAuthSession();
  return session ? session.role : null;
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Store user session in tab-isolated sessionStorage
 * and separately in localStorage (keyed by role) to prevent overwriting.
 */
export const setAuthSession = (token, email, role) => {
  const normalizedRole = (role || "USER").trim().toUpperCase();
  const sessionPayload = {
    token,
    email,
    role: normalizedRole,
    savedAt: new Date().toISOString(),
  };

  const payloadStr = JSON.stringify(sessionPayload);

  // 1. Save to tab-specific sessionStorage (ensures tabs do NOT overwrite each other)
  sessionStorage.setItem(STORAGE_KEYS.ACTIVE_TAB_AUTH, payloadStr);

  // 2. Save separately in localStorage based on role
  if (normalizedRole === "ADMIN") {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PERSISTENT, payloadStr);
  } else {
    localStorage.setItem(STORAGE_KEYS.USER_PERSISTENT, payloadStr);
  }

  // Also maintain backward-compatible keys in localStorage for this role
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
  localStorage.setItem("role", normalizedRole);
};

/**
 * Clear the current tab's active session, and remove the role's persistent entry.
 */
export const clearAuthSession = () => {
  const current = getAuthSession();
  sessionStorage.removeItem(STORAGE_KEYS.ACTIVE_TAB_AUTH);

  if (current?.role === "ADMIN") {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_PERSISTENT);
  } else if (current?.role === "USER") {
    localStorage.removeItem(STORAGE_KEYS.USER_PERSISTENT);
  }

  // Clean fallback keys
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
};

