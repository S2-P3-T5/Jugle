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
  name: string;
  address1: string;
  description: string;
  imageUrl: string;
}

// TODO : props 재설정
export default function ShopDataCard({
  shopId,
}: {
  shopId: string | string[] | undefined;
}) {
  const mockData = {
    name: "도토리 식당",
    address1: "서울시 송파구",
    description: "도토리 없는 도토리 식당입니다.",
    imageUrl: "https://i.ibb.co/0V2PH9f/default.jpg",
  };

  return (
    <>
      {typeof shopId === "string" && (
        <Card className="w-[350px] p-[20px]">
          <Image
            src={mockData.imageUrl}
            width="311"
            height="178"
            alt="가게이미지"
          />
          <CardHeader>
            <div>식당</div>
            <CardTitle>{mockData.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <span>{mockData.address1}</span>
            <p>{mockData.description}</p>
          </CardContent>
          <CardFooter className="flex gap-[10px]">
            <Button>편집하기</Button>
            <Button asChild>
              <Link href={PAGE_ROUTES.parseNoticeRegisterURL(shopId)}>
                공고 등록하기
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
