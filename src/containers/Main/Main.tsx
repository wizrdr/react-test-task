import { useEffect, useMemo, useState } from "react";
import { Movie } from "../../components/Movie/Movie";
import Pagination from "../../components/Pagination/Pagination";
import { apiService } from "../../services/api";
import { IMovie, IMovieResponse } from "../../shared/types";
import "./Main.scss";

const PageSize = 21;

export const Main = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let i = 1;
    const promiseArr = [];
    while (i <= 25) {
      promiseArr.push(apiService.movies.getPopularMovie(i));
      i++;
    }
    Promise.all(promiseArr).then((resp) => {
      const movies = resp.map((item) => {
        const normalizedMovies = item.data.results.map(
          (item: IMovieResponse) => {
            const isHighlighted = localStorage.getItem(item.id.toString());
            const date = new Date(item.release_date);
            return {
              id: item.id,
              imagePath: item.poster_path,
              title: item.title,
              currentRating: item.vote_average,
              year: date.toLocaleDateString(),
              isHighlighted: !!isHighlighted,
            };
          }
        );
        return normalizedMovies;
      });
      setMovies(movies.flat());
    });
  }, []);

  const sortASC = () => {
    const sortable = [...movies];
    sortable.sort(
      (first, second) => first.currentRating - second.currentRating
    );

    setMovies(sortable);
  };

  const sortDESC = () => {
    const sortable = [...movies];
    sortable.sort(
      (first, second) => second.currentRating - first.currentRating
    );

    setMovies(sortable);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return movies.slice(firstPageIndex, lastPageIndex);
  }, [movies, currentPage]);

  const highligtMovie = (id: number) => {
    const moviesWithHighlight = movies.map((item) => {
      if (id === item.id) {
        localStorage.setItem(id.toString(), "true");

        return {
          ...item,
          isHighlighted: true,
        };
      }
      return item;
    });

    setMovies(moviesWithHighlight);
  };

  const removeHighlight = (id: number) => {
    const moviesWithHighlight = movies.map((item) => {
      if (id === item.id) {
        localStorage.removeItem(id.toString());

        return {
          ...item,
          isHighlighted: false,
        };
      }
      return item;
    });

    setMovies(moviesWithHighlight);
  };

  return (
    <main>
      <section className="Main">
        {currentTableData?.map((item) => {
          return (
            <Movie
              key={item.id}
              movie={item}
              toggleHighlight={
                item.isHighlighted ? removeHighlight : highligtMovie
              }
            />
          );
        })}
      </section>
      <section className="Filters">
        <div className="Buttons">
          <button onClick={sortDESC}> decreasing</button>
          <button onClick={sortASC}> increasing</button>
        </div>

        <Pagination
          currentPage={currentPage}
          totalCount={movies.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </section>
    </main>
  );
};
