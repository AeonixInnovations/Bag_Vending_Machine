import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value.
 *
 * @param {string} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {string} The debounced value.
 */
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if the value or delay changes or the component is unmounted
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue };
};

export default useDebounce;
