// lib/search.ts

export interface ImageResult {
  id: string;
  title: string;
  thumbnailUrl: string;
  originalImageUrl: string;
  sourcePageUrl: string;
  sourceDomain: string;
  width: number;
  height: number;
}

export interface SearchImagesResponse {
  results: ImageResult[];
  totalHits: number;
  page: number;
  perPage: number;
  totalPages: number;
  effectiveQuery: string;
  queryWasTranslated: boolean;
}

interface PixabayHit {
  id: number;
  tags: string;
  previewURL: string;
  largeImageURL: string;
  pageURL: string;
  imageWidth: number;
  imageHeight: number;
}

interface PixabaySearchResponse {
  hits: PixabayHit[];
  totalHits: number;
}

interface MyMemoryTranslationResponse {
  responseData?: {
    translatedText?: string;
  };
}

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const MYMEMORY_TRANSLATE_EMAIL = process.env.MYMEMORY_TRANSLATE_EMAIL;
export const PIXABAY_RESULTS_PER_PAGE = 20;
const ARABIC_SCRIPT_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

function queryContainsArabic(text: string) {
  return ARABIC_SCRIPT_REGEX.test(text);
}

async function translateArabicQueryToEnglish(query: string) {
  if (!queryContainsArabic(query)) {
    return query;
  }

  const params = new URLSearchParams({
    q: query,
    langpair: "ar|en",
    mt: "1",
  });

  if (MYMEMORY_TRANSLATE_EMAIL) {
    params.set("de", MYMEMORY_TRANSLATE_EMAIL);
  }

  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?${params.toString()}`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`MyMemory API responded with status ${response.status}`);
    }

    const data = (await response.json()) as MyMemoryTranslationResponse;
    const translatedText = data.responseData?.translatedText?.trim();

    if (!translatedText) {
      return query;
    }

    return translatedText;
  } catch (error) {
    console.warn("Arabic query translation failed. Falling back to the original query.", error);
    return query;
  }
}

export async function searchImages(query: string, page: number = 1): Promise<SearchImagesResponse> {
  const currentPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const effectiveQuery = await translateArabicQueryToEnglish(query);
  const queryWasTranslated = effectiveQuery !== query;

  if (!PIXABAY_API_KEY) {
    console.warn("PIXABAY_API_KEY is not set. Returning mock results for testing.");
    const mockResults = Array.from({ length: 60 }).map((_, i) => ({
      id: `mock-${i + 1}`,
      title: `${effectiveQuery} image ${i + 1}`,
      thumbnailUrl: `https://picsum.photos/seed/${effectiveQuery}-${i + 1}/400/300`,
      originalImageUrl: `https://picsum.photos/seed/${effectiveQuery}-${i + 1}/1200/900`,
      sourcePageUrl: "https://example.com",
      sourceDomain: "mock-source.com",
      width: 1200,
      height: 900,
    }));

    const start = (currentPage - 1) * PIXABAY_RESULTS_PER_PAGE;

    return {
      results: mockResults.slice(start, start + PIXABAY_RESULTS_PER_PAGE),
      totalHits: mockResults.length,
      page: currentPage,
      perPage: PIXABAY_RESULTS_PER_PAGE,
      totalPages: Math.ceil(mockResults.length / PIXABAY_RESULTS_PER_PAGE),
      effectiveQuery,
      queryWasTranslated,
    };
  }

  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(effectiveQuery)}&page=${currentPage}&per_page=${PIXABAY_RESULTS_PER_PAGE}&image_type=photo&safesearch=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Pixabay API responded with status ${response.status}`);
    }

    const data = (await response.json()) as PixabaySearchResponse;
    const totalPages = Math.max(1, Math.ceil(data.totalHits / PIXABAY_RESULTS_PER_PAGE));

    return {
      results: data.hits.map((hit) => ({
        id: hit.id.toString(),
        title: hit.tags,
        thumbnailUrl: hit.previewURL,
        originalImageUrl: hit.largeImageURL,
        sourcePageUrl: hit.pageURL,
        sourceDomain: "pixabay.com",
        width: hit.imageWidth,
        height: hit.imageHeight,
      })),
      totalHits: data.totalHits,
      page: currentPage,
      perPage: PIXABAY_RESULTS_PER_PAGE,
      totalPages,
      effectiveQuery,
      queryWasTranslated,
    };
  } catch (error) {
    console.error("Error fetching images from Pixabay:", error);
    return {
      results: [],
      totalHits: 0,
      page: currentPage,
      perPage: PIXABAY_RESULTS_PER_PAGE,
      totalPages: 1,
      effectiveQuery,
      queryWasTranslated,
    };
  }
}
