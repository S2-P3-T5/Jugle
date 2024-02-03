import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PAGE_ROUTES } from "@/routes";

interface ShopDataCardProps {
  shopId: string | string[] | undefined;
  shopData: {
    name: string;
    address1: string;
    description: string;
    imageUrl: string;
  };
}

// TODO : props 재설정
export default function ShopDataCard({ shopId, shopData }: ShopDataCardProps) {
  return (
    <>
      {typeof shopId === "string" && (
        <div className="mx-auto flex w-[35.1rem] flex-col gap-[1.6rem] px-[1.2rem] py-[4rem]">
          <span className="text-[2rem] font-bold">내 가게</span>
          <Card className="flex w-[35.1rem] flex-col rounded-[0.8rem] border-none bg-red-10 p-[2rem]">
            <div className="flex h-[17.8rem] w-[31.1rem] items-center overflow-hidden rounded-[1.2rem]">
              <Image
                src={shopData.imageUrl}
                width="311"
                height="178"
                alt="가게이미지"
              />
            </div>
            <div>
              <CardHeader className="flex flex-col p-0 pt-[1.2rem]">
                <div className="text-[1.4rem] font-bold text-primary">식당</div>
                <CardTitle className="text-[2.4rem] font-bold">
                  {shopData.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex gap-[0.6rem]">
                  <Image src="/icons/point.svg" alt="" width={16} height={16} />
                  <span className="leadning-[2.2rem] my-[0.8rem] block text-[1.4rem] text-gray-50">
                    {shopData.address1}
                  </span>
                </div>
                <p className="text-[1.4rem] leading-[2.2rem]">
                  {shopData.description}
                </p>
              </CardContent>
              <CardFooter className="mt-[2.4rem] flex justify-between gap-[10px] p-0">
                <Button asChild>
                  <Link
                    className="h-[3.8rem] w-[15.1rem] rounded-[0.6rem] border-[1px] border-primary bg-white px-[2rem] py-[1rem]"
                    href={PAGE_ROUTES.parseShopsEditURL(shopId)}
                  >
                    <span className="text-[1.4rem] font-bold text-primary">
                      편집하기
                    </span>
                  </Link>
                </Button>
                <Button asChild>
                  <Link
                    className="h-[3.8rem] w-[15.1rem] rounded-[0.6rem] px-[2rem] py-[1rem]"
                    href={PAGE_ROUTES.parseNoticeRegisterURL(shopId)}
                  >
                    <span className="text-[1.4rem] font-bold">
                      공고 등록하기
                    </span>
                  </Link>
                </Button>
              </CardFooter>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
