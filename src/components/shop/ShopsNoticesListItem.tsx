import Image from "next/image";

import ArrowUpIconCustom from "@/components/ui/ArrowUpIconCustom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ShopsNoticesListItemProps {
  shopData: {
    name: string;
    imageUrl: string;
    address1: string;
    originalHourlyPay: number;
  };
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
  };
}

const colorCalculate = (num: number) => {
  if (num >= 40) return "red-40";
  else if (num >= 30) return "red-30";
  else if (num >= 20) return "red-20";
  else if (num >= 10) return "red-10";
};

export const timeCalculate = (time: string, workhour: number) => {
  const startDay = time.split("T")[0];
  const startTime = time.split("T")[1].split(":")[0];
  const minute = time.split("T")[1].split(":")[1];
  const endTimeCal =
    +startTime + +workhour >= 24
      ? +startTime + +workhour - 24
      : +startTime + +workhour;
  const endTime = 10 > endTimeCal ? "0" + endTimeCal : endTimeCal;

  return [startDay, startTime, minute, endTime];
};

export default function ShopsNoticesListItem({
  item,
  shopData,
}: ShopsNoticesListItemProps) {
  const riseRate = Math.floor(
    (item.hourlyPay / shopData.originalHourlyPay - 1) * 100,
  );
  const [startDay, startTime, minute, endTime] = timeCalculate(
    item.startsAt,
    item.workhour,
  );
  const color = colorCalculate(riseRate);

  return (
    <div>
      <Card className="w-[17.1rem] p-[1.2rem]">
        <CardHeader className="mb-[1.2rem] h-[8.4rem] w-[14.7rem] rounded-[1.2rem] p-0">
          <Image
            className="h-[8.4rem] w-[14.7rem] object-cover p-0"
            src={shopData.imageUrl}
            alt=""
            width={162}
            height={148}
          />
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col gap-[0.8rem]">
            <CardTitle className="text-[16px] font-bold leading-[2rem]">
              {shopData.name}
            </CardTitle>
            <div className="flex items-start gap-[0.6rem]">
              <Image src="/icons/clock.svg" alt="" width={16} height={16} />
              <CardDescription className="text-[1.2rem] leading-[1.6rem] text-gray-50">
                {startDay}
                <br />
                {startTime}:{minute}~{endTime}:{minute}({item.workhour}
                시간)
              </CardDescription>
            </div>
            <div className="flex items-center gap-[0.6rem]">
              <Image src="/icons/point.svg" alt="" width={16} height={16} />
              <CardDescription className="text-[1.2rem] leading-[1.6rem] text-gray-50">
                {shopData.address1}
              </CardDescription>
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-[1.6rem] p-0">
          <div className="flex flex-col gap-[0.2rem]">
            <span className="text-[1.8rem] font-bold">
              {Number(item.hourlyPay).toLocaleString()}원
            </span>
            <div className="flex">
              <span className={`text-[1.2rem] leading-[1.6rem] text-${color}`}>
                기존 시급보다 {riseRate}%
              </span>
              {riseRate > 0 && <ArrowUpIconCustom color={color} />}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
