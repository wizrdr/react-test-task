import { FC } from "react";
import { IMAGE_BASE_SIZE, IMAGE_BASE_URL } from "../../config";
import { IMovie } from "../../shared/types";
import star from "../../assets/star.svg";
import "./Movie.scss";

interface MovieProps {
  movie: IMovie;
  toggleHighlight: (id: number) => void;
}

export const Movie: FC<MovieProps> = ({ movie, toggleHighlight }) => {
  const handleClick = () => {
    toggleHighlight(movie.id);
  };

  return (
    <div className={`Movie ${movie.isHighlighted ? "Highlighted" : ""}`}>
      <div className="Poster">
        <img
          src={`${IMAGE_BASE_URL}${IMAGE_BASE_SIZE}${movie.imagePath}`}
          alt="poster"
        />
      </div>
      <h2 className="Title">
        <a
          href={`https://www.themoviedb.org/movie/${movie.id}`}
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          {movie.title}
        </a>
      </h2>
      <p className="Rating">Rating: {movie.currentRating}</p>
      <p className="Year">{movie.year}</p>
      <button className="HighlightButton" onClick={handleClick}>
        <img src={star} alt="highlight" />
      </button>
    </div>
  );
};
