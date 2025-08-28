// src/hooks/useLocalStorageList.js
import { useEffect, useState } from "react";

export function useLocalStorageList(key, initialValue = []) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return initialValue;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : initialValue;
    } catch {
      return initialValue; // fallback if data is corrupt
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch {
      // ignore write errors for demo purposes
    }
  }, [key, items]);

  return [items, setItems];
}
