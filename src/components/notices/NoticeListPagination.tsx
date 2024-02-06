import { Fragment } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function generateArray(n: number) {
  return Array.from({ length: n }, (_, index) => index + 1);
}

interface NoticeListPagination {
  count: number;
  handlePage: (num: number) => void;
  page: number;
}

export default function NoticeListPagination({
  count,
  handlePage,
  page,
}: NoticeListPagination) {
  const pageCount = Math.ceil(count / 6);
  const pageArr: number[] = generateArray(pageCount);

  const handlePageClick = (p: number) => {
    handlePage(p);
  };
  const handlePrePageClick = () => {
    if (page > 1) {
      handlePage(page - 1);
    }
  };
  const handleNextPageClick = () => {
    if (page < pageCount) {
      handlePage(page + 1);
    }
  };

  //TODO: 표시되는 페이지 숫자 수정
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer" onClick={handlePrePageClick}>
          <PaginationPrevious />
        </PaginationItem>
        {pageArr.map((p) => {
          return (
            <Fragment key={p}>
              <PaginationItem
                onClick={() => handlePageClick(p)}
                className="cursor-pointer"
              >
                <PaginationLink isActive={p === page}>{p}</PaginationLink>
              </PaginationItem>
            </Fragment>
          );
        })}
        <PaginationItem
          className="cursor-pointer"
          onClick={handleNextPageClick}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
