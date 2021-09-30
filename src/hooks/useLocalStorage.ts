import { useEffect, useState } from 'react';

interface LocalStorageItem {
  validator?: (value: any) => boolean;
  fallbackValue: any;
}

type LocalStorageKey = 'results';

// eslint-disable-next-line no-undef
const LOCALSTORAGE_ITEMS: Record<LocalStorageKey, LocalStorageItem> = {
  'results': {
    fallbackValue: {}
  }
};

type UseLocalStorage<T> = [T, (value: T) => void, () => void];

const parseValue = (value: any): any => {
  try {
    return JSON.parse(`${value}`);
  } catch (error) {
    if (value === 'undefined') {
      return undefined;
    }
    // fallback for non-object items
    return value;
  }
};

const stringify = (value: any): string => {
  return typeof value === 'object' ? JSON.stringify(value) : `${value}`;
};

function useLocalStorage<T>(key: LocalStorageKey): UseLocalStorage<T> {
  const quizKey = `quiz-${key}`;
  const { validator = () => true, fallbackValue } = LOCALSTORAGE_ITEMS[key];
  const [value, setStoredValue] = useState(() => {
    try {
      const item = parseValue(window.localStorage.getItem(quizKey) || fallbackValue);
      if (!validator(item)) {
        storeItem(fallbackValue);
        return fallbackValue;
      }
      return item;
    } catch (error) {
      return fallbackValue;
    }
  });

  const storeItem = (value: T) => {
    const storedValue = stringify(value);
    window.localStorage.setItem(quizKey, storedValue);
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: quizKey,
        newValue: storedValue
      })
    );
  };

  const onStorageChange = ({ key: changedKey, newValue: changedValue }: StorageEvent) => {
    if (changedKey === quizKey && changedValue) {
      if (stringify(value) !== changedValue) {
        const parsedValue = parseValue(changedValue);
        setStoredValue(parsedValue);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageChange);
    setValue(value);
    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, []);

  const setValue = (value: T) => {
    if (!validator(value)) {
      // eslint-disable-next-line no-console
      console.warn(
        `useLocalStorage: validation failed for ${key} and value ${JSON.stringify(value)}`
      );
      return;
    }
    setStoredValue(value);
    storeItem(value);
  };

  const deleteValue = () => {
    window.localStorage.removeItem(quizKey);
    setStoredValue(undefined);
  };

  return [value, setValue, deleteValue];
}

export {
  useLocalStorage, LOCALSTORAGE_ITEMS,
  parseValue
};

export type { LocalStorageKey };

