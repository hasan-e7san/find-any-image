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

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

export async function searchImages(query: string, page: number = 1): Promise<ImageResult[]> {
  if (!PIXABAY_API_KEY) {
    console.warn("PIXABAY_API_KEY is not set. Returning mock results for testing.");
    // Mock results for testing
    return Array.from({ length: 12 }).map((_, i) => ({
      id: `mock-${i}`,
      title: `${query} image ${i + 1}`,
      thumbnailUrl: `https://picsum.photos/seed/${query}-${i}/400/300`,
      originalImageUrl: `https://picsum.photos/seed/${query}-${i}/1200/900`,
      sourcePageUrl: "https://example.com",
      sourceDomain: "mock-source.com",
      width: 1200,
      height: 900,
    }));
  }

  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&page=${page}&per_page=20&image_type=photo&safesearch=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Pixabay API responded with status ${response.status}`);
    }

    const data = await response.json();
    
    return data.hits.map((hit: any) => ({
      id: hit.id.toString(),
      title: hit.tags,
      thumbnailUrl: hit.previewURL,
      originalImageUrl: hit.largeImageURL,
      sourcePageUrl: hit.pageURL,
      sourceDomain: "pixabay.com",
      width: hit.imageWidth,
      height: hit.imageHeight,
    }));
  } catch (error) {
    console.error("Error fetching images from Pixabay:", error);
    return [];
  }
}
