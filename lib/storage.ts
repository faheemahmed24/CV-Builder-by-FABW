import { encodeData, decodeData } from './textUtils';

const STORAGE_KEY = 'cv_builder_data';

export const saveToStorage = (data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

export const loadFromStorage = (): any | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const clearStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const getShareUrl = (data: any): string => {
  if (typeof window !== 'undefined') {
    const hash = encodeData(data);
    return `${window.location.origin}${window.location.pathname}#${hash}`;
  }
  return '';
};

export const loadFromUrl = (): any | null => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.slice(1);
    if (hash) {
      return decodeData(hash);
    }
  }
  return null;
};
