import { useState } from "react";

//This is a custom hook called useLocalStorage which takes two arguments: keyName and defaultValue. It returns an array with two elements: storedValue and setValue. The hook uses useState to manage the state of storedValue
export const useLocalStorage = (keyName: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) { }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
