import assert = require('assert/strict');
import { websiteConfig } from '../configManager';

export const siteUrl = websiteConfig.baseApiUrl;
export const staticFilesUrl = `${siteUrl}/static-files`;
export const wxacodeUrl = `${siteUrl}/wxacode/`;

export function genPageLink(url: string, offset: number): string {
  assert.ok(offset >= 0);

  const searchPos = url.indexOf('?');
  if (searchPos < 0) {
    return `${url}?offset=${offset}`;
  }

  const searchParams = new URLSearchParams(url.substring(searchPos));
  searchParams.set('offset', offset.toString());

  const urlPath = url.substring(0, searchPos + 1);
  return urlPath + searchParams.toString();
}

export function genPageLinks(
  url: string,
  total: number,
  offset: number,
  limit: number,
): [string | null, string | null] {
  let previousLink: string | null = null;
  if (offset > 0) {
    previousLink = genPageLink(url, Math.max(offset - limit, 0));
  }
  let nextLink: string | null = null;
  if (total - offset > limit) {
    nextLink = genPageLink(url, offset + limit);
  }

  return [previousLink, nextLink];
}
