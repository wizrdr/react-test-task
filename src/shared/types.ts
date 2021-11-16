export interface IMovie {
  id: number;
  imagePath: string;
  title: string;
  currentRating: number;
  year: number;
  isHighlighted: boolean;
}

export interface IMovieResponse {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: number;
}
