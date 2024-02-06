import { useEffect, useState } from "react";

import { getAllNoticesListData } from "@/apis/notice";
import NoticeListCardList from "@/components/notices/NoticeListCardList";
import NoticeListDropdownMenu from "@/components/notices/NoticeListDropDownMenu";
import NoticeListPagination from "@/components/notices/NoticeListPagination";
import NoticeListPopover from "@/components/notices/NoticeListPopover";
import ShopsNoticesListItem from "@/components/shop/ShopsNoticesListItem";

export default function NoticesLists() {
  const [allNoticesList, setAllNoticesList] = useState<any>("");

  useEffect(() => {
    const getData = async () => {
      const result: any = await getAllNoticesListData();
      setAllNoticesList(result);
    };
    getData();
  }, []);

  // TODO : 타입수정, items 분리 ?, 로딩처리
  return (
    <>
      <div className="flex h-auto w-full flex-col gap-[1rem] bg-red-10 px-[1rem] py-[4rem]">
        <h1 className="text-[2rem] font-[700]">맞춤 공고</h1>
        <div className="flex w-[100%] flex-nowrap gap-[1rem] overflow-hidden">
          <NoticeListCardList>dd</NoticeListCardList>
        </div>
      </div>

      <div>
        <ul className="mx-auto flex w-[35.1rem] flex-col gap-[1.6rem] pb-[8rem] pt-[4rem] tablet:w-[67.8rem] tablet:gap-[3.2rem] tablet:pb-[12rem] tablet:pt-[6rem] desktop:w-[96.4rem]">
          <span className="text-[2rem] font-bold tablet:text-[2.8rem]">
            전체 공고
          </span>
          <NoticeListDropdownMenu />
          <NoticeListPopover />
          <div className="flex w-[35.1rem] flex-wrap justify-between gap-x-[0.9rem] gap-y-[1.6rem] tablet:w-[67.8rem] tablet:gap-y-[3.2rem] desktop:w-[96.4rem]">
            {allNoticesList &&
              allNoticesList.items.map((item: any) => (
                <li key={item.item.id}>
                  <ShopsNoticesListItem
                    item={item.item}
                    shopData={item.item.shop.item}
                  />
                </li>
              ))}
          </div>
        </ul>
      </div>
      <NoticeListPagination />
    </>
  );
}
