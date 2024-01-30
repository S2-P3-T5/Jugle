import Image from "next/image";

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
  else return "red-10";
};

export default function ShopsNoticesListItem({
  item,
  shopData,
}: ShopsNoticesListItemProps) {
  const riseRate = Math.floor(
    (item.hourlyPay / shopData.originalHourlyPay - 1) * 100,
  );
  const startDay = item.startsAt.split("T")[0];
  const startTime = item.startsAt.split("T")[1].split(":")[0];
  const minute = item.startsAt.split("T")[1].split(":")[1];
  const endTimeCal =
    +startTime + +item.workhour >= 24
      ? +startTime + +item.workhour - 24
      : +startTime + +item.workhour;
  const endTime = 10 > endTimeCal ? "0" + endTimeCal : endTimeCal;
  const color = colorCalculate(riseRate);

  return (
    <>
      <Card className="w-auto max-w-[37.5rem]">
        <CardHeader>
          <Image src={shopData.imageUrl} alt="" width={162} height={148} />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-[1rem]">
            <CardTitle>{shopData.name}</CardTitle>
            <div className="flex items-start gap-[0.5rem]">
              <Image src="/icons/clock.svg" alt="" width={16} height={16} />
              <div>
                <CardDescription>{startDay}</CardDescription>
                <CardDescription>
                  {startTime}:{minute}~{endTime}:{minute}({item.workhour}
                  시간)
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-[0.5rem]">
              <Image src="/icons/point.svg" alt="" width={16} height={16} />
              <CardDescription>{shopData.address1}</CardDescription>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col">
            <span className="text-[1.8rem] font-[700] text-black">
              {item.hourlyPay}원
            </span>
            <div className="flex">
              <span className={`text-[1.2rem] font-[400] text-${color}`}>
                기존 시급보다 {riseRate}%
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                className={`fill-${color}`}
              >
                <path d="M10.0001 13.5483H6.0001V8.21495H2.77344L8.0001 2.98828L13.2268 8.21495H10.0001V13.5483Z" />
              </svg>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
