import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import { fetcher } from "@/apis/fetcher";
import EmployeeLayout from "@/components/common/EmployeeLayout";
import ApplicationList from "@/components/noticeDetail/ApplicationList";
import { HighHourlyWageBadge } from "@/components/noticeDetail/Badge";
import { ApplyNoticeButton } from "@/components/noticeDetail/Buttons";
import { useTimeCalculate } from "@/components/noticeDetail/Hooks";
import ShopsNoticesListItem from "@/components/shop/ShopsNoticesListItem";
import { getAccessTokenInStorage } from "@/helpers/auth";
import { UserContext } from "@/providers/UserProvider";
import { apiRouteUtils, PAGE_ROUTES } from "@/routes";

function NoticeDetail() {
  const [recentNotices, setRecentNotices] = useState<
    { id: string; data: any }[]
  >([]);
  const user = useContext(UserContext);
  const router = useRouter();
  const [offset, setOffset] = useState(1);
  const { shopId, noticeId } = router.query;
  const normalizedShopId = String(shopId);
  const normalizedNoticeId = String(noticeId);
  const { data } = useQuery<any>({
    queryKey: ["notice", noticeId],
    queryFn: async () => {
      const response = await fetcher.get(
        apiRouteUtils.parseShopNoticeDetail(
          normalizedShopId,
          normalizedNoticeId,
        ),
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const shopOriginalData = data?.item?.shop?.item ?? {};
  const shopNoticeData = data?.item ?? {};
  const startsAt = shopNoticeData.startsAt;
  const workhour = shopNoticeData.workhour;
  const applicationData = ApplicationList(offset);
  const [startDay, startTime, minute, endTime] = useTimeCalculate(
    startsAt,
    workhour,
  );
  const originalHourlyPay = shopOriginalData.originalHourlyPay;
  const hourlyPay = shopNoticeData.hourlyPay;

  let increasePercentage: number | undefined;
  if (hourlyPay > originalHourlyPay) {
    increasePercentage = Math.round(
      ((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100,
    );
  }
  let badgeProps = {};
  if (increasePercentage !== undefined) {
    if (increasePercentage >= 50) {
      badgeProps = {
        className: "bg-red-40",
        increasePercentage: increasePercentage.toFixed(0),
      };
    } else if (increasePercentage >= 40) {
      badgeProps = {
        className: "bg-red-30",
        increasePercentage: increasePercentage.toFixed(0),
      };
    } else if (increasePercentage >= 30) {
      badgeProps = {
        className: "bg-red-20",
        increasePercentage: increasePercentage.toFixed(0),
      };
    } else if (increasePercentage > 20) {
      badgeProps = {
        className: "bg-red-10",
        increasePercentage: increasePercentage.toFixed(0),
      };
    }
  }

  //TODO: 가게의 특정 공고의 지원 목록 조회하는 api를 구성하면 username과 status를 수정할 예정
  //신청자 이름, 상태 data
  const initialApplicants = applicationData?.items?.[0]?.item?.map(
    (item: { user: { name: string | undefined }; status: any }) => ({
      name: item.user.name,
      status: item.status,
    }),
  );
  const [applicants, setApplicants] = useState(initialApplicants);
  const handleApprove = (applicationId: number) => {
    const updatedApplicants = [...applicants];
    updatedApplicants[applicationId].status = "accepted";
    setApplicants(updatedApplicants);
  };

  const handleReject = (applicationId: number) => {
    const updatedApplicants = [...applicants];
    updatedApplicants[applicationId].status = "rejected";
    setApplicants(updatedApplicants);
  };

  useEffect(() => {
    if (router.query.offset) {
      if (Array.isArray(router.query.offset)) {
        setOffset(parseInt(router.query.offset[0]));
      } else {
        setOffset(parseInt(router.query.offset));
      }
    }
  }, [router.query.offset]);

  useEffect(() => {
    if (!getAccessTokenInStorage()) {
      router.push(PAGE_ROUTES.SIGNIN);
      return;
    }

    if (!noticeId || !shopNoticeData) {
      return; // noticeId 또는 shopNoticeData가 없는 경우에는 더 이상 처리하지 않음
    }

    // 공고 정보를 JSON 형태로 문자열화하여 세션 스토리지에 저장
    setRecentNotices((prevRecentNotices) => {
      const updatedRecentNotices = [
        ...prevRecentNotices.slice(0, 5), // 최근 5개만 유지하고
        { id: noticeId as string, data: shopNoticeData }, // 새로운 공고 추가
      ];
      localStorage.setItem(
        "recentNotices",
        JSON.stringify(updatedRecentNotices),
      );
      return updatedRecentNotices;
    });
  }, [user, noticeId, shopNoticeData, router, setRecentNotices]); // setRecentNotices를 의존성 배열에 추가

  return (
    <EmployeeLayout>
      <div className="flex w-full flex-col items-center justify-center tablet:w-[74.4rem] desktop:w-[144rem]">
        <div className="flex w-full flex-col items-start gap-[1.2rem] bg-[#fafafa] px-[1.2rem] py-[4rem] tablet:w-full tablet:px-[3.2rem] tablet:py-[6rem] desktop:px-[23.8rem]">
          <div className="flex w-full flex-col gap-[1.6rem] tablet:w-full">
            <div className="inline-flex flex-col items-start gap-[0.8rem]">
              <span className="text-[1.4rem] font-bold not-italic leading-normal text-primary tablet:text-[1.6rem]  ">
                {shopOriginalData?.category}
              </span>
              <span className="text-[2rem] font-bold not-italic leading-normal text-black tablet:text-[2.8rem]">
                {shopOriginalData?.name}
              </span>
            </div>
            <div className="flex w-[35.1rem] flex-col items-start gap-[1.2rem] rounded-[1.2rem] border border-gray-20 bg-white p-[2rem] tablet:w-[68rem] tablet:gap-[1.6rem] tablet:p-[2.4rem] desktop:h-[35.6rem] desktop:w-[96.4rem] desktop:flex-row">
              <div className="relative flex h-[15.8rem] w-[31.1rem] items-center justify-center tablet:h-[33.2rem] tablet:w-[63.2rem] desktop:h-[30.8rem] desktop:w-[55.4rem]">
                <Image
                  src={shopOriginalData?.imageUrl}
                  layout="fill"
                  objectFit="contain"
                  alt="로고이미지"
                />
              </div>
              <div className="flex flex-col items-start gap-[2.4rem] self-stretch">
                <div className="flex flex-col items-start gap-[0.8rem] self-stretch tablet:gap-[1.2rem]">
                  <div className="flex flex-col items-start gap-[0.8rem]">
                    <span className="text-[1.4rem] font-bold not-italic leading-normal text-primary tablet:text-[1.6rem]  ">
                      시급
                    </span>
                    <div className="flex w-full items-center gap-[0.4rem]">
                      <span className="text-[2.4rem] font-bold not-italic leading-normal tracking-[0.048rem] text-black tablet:text-[2.8rem]">
                        {shopNoticeData?.hourlyPay}원
                      </span>
                      {hourlyPay > originalHourlyPay && (
                        <HighHourlyWageBadge
                          className={""}
                          increasePercentage={0}
                          {...badgeProps}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-[0.6rem]">
                    <div className="relative flex h-[1.6rem] w-[1.6rem] items-center justify-center">
                      <Image
                        src="/icons/clock.svg"
                        alt="시간 아이콘"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <span className="text-[1.4rem] font-normal not-italic leading-[2.2rem] text-gray-50 tablet:text-[1.6rem]">
                      {startDay} {startTime}:{minute}~{endTime}:{minute}(
                      {shopOriginalData?.workhour}
                      시간)
                    </span>
                  </div>
                  <div className="flex items-center gap-[0.6rem]">
                    <div className="relative flex h-[1.6rem] w-[1.6rem] items-center justify-center">
                      <Image
                        src="/icons/point.svg"
                        alt="장소 아이콘"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <span className="text-[1.4rem] font-normal not-italic leading-[2.2rem] text-gray-50 tablet:text-[1.6rem]">
                      {shopOriginalData?.address1} {shopOriginalData?.address2}
                    </span>
                  </div>
                  <span className="text-black-50 h-[6.6rem] scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem] tablet:text-[1.6rem]">
                    {shopOriginalData?.description}
                  </span>
                </div>
                <ApplyNoticeButton />
              </div>
            </div>
            <div className="flex h-[15.3rem] w-full flex-col items-start gap-[0.8rem] rounded-[1.2rem] bg-gray-10 p-[2rem] tablet:h-[14.8rem]">
              <span className="text-black-50 scroll-auto text-[1.4rem] font-bold not-italic leading-[2.2rem] tablet:text-[1.6rem]">
                공고 설명
              </span>
              <span className="text-black-50 scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem] tablet:text-[1.6rem]">
                {shopNoticeData?.description}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-[1.6rem] bg-[#fafafa] px-[1.2rem] pb-[8rem] pt-[4rem]">
          <h1 className="text-[2rem] font-bold not-italic leading-normal text-black">
            최근에 본 공고
          </h1>
          <div className="grid grid-cols-2 gap-x-[0.8rem] gap-y-[1.6rem]">
            {recentNotices.map((notice) => (
              <div key={notice.id}>
                <ShopsNoticesListItem
                  item={shopNoticeData}
                  shopData={shopOriginalData}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default NoticeDetail;
