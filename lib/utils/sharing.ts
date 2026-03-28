import LZString from 'lz-string';

export function encodeCV(cvData: any): string {
  try {
    const jsonString = JSON.stringify(cvData);
    const compressed = LZString.compressToEncodedURIComponent(jsonString);
    return compressed;
  } catch (error) {
    console.error('Error encoding CV data:', error);
    return '';
  }
}

export function decodeCV(encoded: string): any {
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
    if (!decompressed) return null;
    return JSON.parse(decompressed);
  } catch (error) {
    console.error('Error decoding CV data:', error);
    return null;
  }
}

export function getShareUrl(cvData: any): string {
  const encoded = encodeCV(cvData);
  const url = new URL(window.location.href);
  url.searchParams.set('cv', encoded);
  return url.toString();
}

export function loadFromUrl(): any {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('cv');
  if (!encoded) return null;
  return decodeCV(encoded);
}
