export type tracks = {
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  previewUrl: string;
  collectionPrice: number;
  trackPrice: number;
  trackTimeMillis: number;
  currency: string;
  artworkUrl100: string;
  releaseDate: string;
  trackCount?: string;
  copyright?: string;
  trackNumber?: number;
};
export type reviews = {
  review: string;
  stars: string;
  dateTime: Date;
  name: string;
};
