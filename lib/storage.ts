import { encodeCV, decodeCV } from './utils/sharing';

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
    const encoded = encodeCV(data);
    const url = new URL(window.location.href);
    url.searchParams.set('cv', encoded);
    return url.toString();
  }
  return '';
};

export const loadFromUrl = (): any | null => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('cv');
    if (encoded) {
      return decodeCV(encoded);
    }
  }
  return null;
};
