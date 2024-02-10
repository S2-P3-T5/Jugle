import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PAGE_ROUTES } from "@/routes";

interface ApplyListPaginationProps {
  offset: number;
  shopId: string;
  noticeId: string;
  setOffset: (newOffset: number) => void;
  nextData: boolean;
}

function ApplyListPagination({
  offset,
  shopId,
  noticeId,
  setOffset,
  nextData,
}: ApplyListPaginationProps): JSX.Element {
  const isFirstPage = offset < 1;
  const isLastPage = !nextData;

  const handlePreviousClick = () => {
    if (!isFirstPage) {
      setOffset(offset - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      setOffset(offset + 1);
    }
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${PAGE_ROUTES.parseShopNoticeDetailsURL(shopId, noticeId)}?limit=5&offset=${offset - 1}`}
            onClick={handlePreviousClick}
            isActive={!isFirstPage}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`${PAGE_ROUTES.parseShopNoticeDetailsURL(shopId, noticeId)}?limit=5&offset=${offset}`}
          >
            <span className="text-[1.2rem] tablet:text-[1.4rem]">{offset}</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`${PAGE_ROUTES.parseShopNoticeDetailsURL(shopId, noticeId)}?limit=5&offset=${offset + 1}`}
            onClick={handleNextClick}
            isActive={!isLastPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default ApplyListPagination;
