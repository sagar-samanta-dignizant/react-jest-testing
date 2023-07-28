import { useState } from "react";

//This is a custom hook in React called uselocalStorage. It uses the useState hook to manage state and also interacts with the browser's localStorage API to store and retrieve values
export const uselocalStorage = (keyName: string, defaultValue: any) => {
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
