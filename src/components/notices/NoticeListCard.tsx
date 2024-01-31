import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// TODO : 타입수정, 미사용 변수 제거
export default function NoticeListCard({ item }: any) {
  const {
    address1,
    address2,
    category,
    description,
    id,
    imageUrl,
    name,
    originalHourlyPay,
  }: any = item.shop.item;

  const { startsAt }: any = item;

  const test = true ? "text-red-40" : "text-red-20";
  return (
    <>
      <Card className="w-auto max-w-[37.5rem]">
        <CardHeader>
          <Image
            src={imageUrl}
            alt=""
            width={147}
            height={148}
            style={{ maxWidth: 147 }}
          />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-[1rem]">
            <CardTitle>{name}</CardTitle>
            <div className="flex items-start gap-[0.5rem]">
              <Image
                src="/icons/clock.svg"
                alt=""
                width={16}
                height={16}
                style={{ maxWidth: 16 }}
              />
              <div>
                <CardDescription>{startsAt}2024-01-01</CardDescription>
                <CardDescription>{startsAt}15:00~18:00(3시간)</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-[0.5rem]">
              <Image
                src="/icons/point.svg"
                alt=""
                width={16}
                height={16}
                style={{ maxWidth: 16 }}
              />
              <CardDescription>{address1}</CardDescription>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col">
            <span className="text-[1.8rem] font-[700] text-black">
              {/* {hourlyPay} */}
            </span>
            <div className="flex ">
              <span className={`text-[1.2rem] font-[400] ${test}`}>
                기존 시급보다 50%
              </span>
              <Image
                src="/icons/arrow_up_bold.svg"
                alt=""
                width={16}
                height={16}
                style={{ maxWidth: 16 }}
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
