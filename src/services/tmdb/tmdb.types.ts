export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface TmdbDiscoveryResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
}

export interface TmdbVideo {
  key: string;
  site: string;
  type: string;
  official: boolean;
}

export interface TmdbVideosResponse {
  id: number;
  results: TmdbVideo[];
}
