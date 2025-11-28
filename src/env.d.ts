/// <reference path="../.astro/types.d.ts" />

interface GalleryData {
  images: string[];
  currentIndex: number;
}

interface Window {
  galleryData?: Record<string, GalleryData>;
  openImageGallery: (id: string, index?: number) => void;
  closeImageGallery: (id: string) => void;
  navigateGallery: (id: string, direction: number) => void;
}
