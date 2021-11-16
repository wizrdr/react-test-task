import { FC } from "react";
import { DOTS } from "../../shared/constants";
import { usePagination } from "../../shared/hooks/usePagination";
import "./Pagination.scss";

interface PaginationProps {
  onPageChange: (newPage: number) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  className?: string;
  siblingCount?: number;
}

const Pagination: FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="PaginationContainer">
      <li className="PaginationItem" onClick={onPrevious}>
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, indx) => {
        if (pageNumber === DOTS) {
          return (
            <li key={indx} className="PaginationItem dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={`${
              pageNumber === currentPage ? "selected" : ""
            } PaginationItem`}
            onClick={() => onPageChange(+pageNumber)}
            key={indx}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={
          currentPage === lastPage
            ? "PaginationItem disabled"
            : "PaginationItem"
        }
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
