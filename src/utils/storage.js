// src/utils/storage.js
const DEFAULT_VERSION = 1;

export function getJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Optional migration support if you evolve your schema.
 * Example shape: { version: 1, items: [...] }
 */
export function loadVersioned(key, fallback = { version: DEFAULT_VERSION, items: [] }, migrate = (v) => v) {
  const data = getJSON(key, fallback);
  if (!data || typeof data !== "object") return fallback;
  if (!("version" in data)) return migrate({ version: DEFAULT_VERSION, items: data }); // old shape was array
  return data.version === DEFAULT_VERSION ? data : migrate(data);
}

export function saveVersioned(key, payload) {
  return setJSON(key, payload);
}
