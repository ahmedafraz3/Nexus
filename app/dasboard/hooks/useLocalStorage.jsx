"use client";
import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  // State to store the value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        // Retrieve item from localStorage by key
        const item = window.localStorage.getItem(key);
        // Parse stored JSON or return the initial value if none is found
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      console.error("Error retrieving localStorage item:", error);
      return initialValue;
    }
  });

  // Effect to update localStorage when state changes
  useEffect(() => {
    try {
      const valueToStore =
        typeof storedValue === "function"
          ? storedValue(storedValue)
          : storedValue;

      if (typeof window !== "undefined") {
        // Save value to localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
