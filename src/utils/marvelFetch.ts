import md5 from "md5";

export interface MarvelApiError {
  error: any;
  message: string;
}

export interface MarvelApiResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: MarvelData<T>;
}

export interface MarvelData<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}

export interface FetchOptionsI {
  // limit?: number;
  [key: string]: unknown;
}

function fetchMarvelAPI(partialUrl: string, options: FetchOptionsI) {
  const clientSide = typeof window != "undefined";
  const privateKey =
    (clientSide
      ? process.env.NEXT_PUBLIC_PRIVATE_KEY
      : process.env.PRIVATE_KEY) || "";
  const publicKey =
    (clientSide
      ? process.env.NEXT_PUBLIC_PUBLIC_KEY
      : process.env.PUBLIC_KEY) || "";
  const timestamp = Number(new Date());
  const hash = md5(timestamp + privateKey + publicKey);

  const defaults = {
    ts: timestamp,
    apikey: publicKey,
    hash: hash,
  };
  const envUrl = clientSide ? process.env.NEXT_PUBLIC_URL : process.env.URL;
  const url = new URL(`${envUrl}/${partialUrl}`);
  const searchOptions: FetchOptionsI = { ...defaults, ...options };

  url.search = new URLSearchParams(
    searchOptions as Record<string, string>,
  ).toString();

  return fetch(url.toString());
}

export default async function marvelFetch<T>(
  partialUrl: string,
  options: FetchOptionsI = {},
): Promise<MarvelData<T>> {
  try {
    const response = await fetchMarvelAPI(partialUrl, options);

    if (!response.ok) {
      throw new Error(`Error fetching Marvel data: ${response.status}`);
    }

    const jsonResponse = await response.json();

    // For flexibility
    if (!jsonResponse.data || !jsonResponse.data.results) {
      throw new Error("Invalid or unexpected Marvel API response format");
    }

    return jsonResponse.data as MarvelData<T>;
  } catch (error: any) {
    throw new Error("Error fetching Marvel endpoing", error);
  }
}
