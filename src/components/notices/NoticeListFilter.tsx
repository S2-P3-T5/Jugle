import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";

import AddressSelector from "@/components/notices/AddressSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function NoticeListFilter() {
  const [address, setAddress] = useState<string[]>([]);
  const [startsAtDate, setStartAtDate] = useState("");
  const [pay, setPay] = useState(0);

  const handleStartAtDate = (e: any) => {
    setStartAtDate(e.target.value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="w-[auto] bg-red-30 text-[1.2rem] font-semibold text-white"
          variant="outline"
        >
          상세 필터
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <span>위치</span>
        <AddressSelector address={address} setAddress={setAddress} />
        <span>시작일</span>
        <Input onBlur={handleStartAtDate} type="date" />
        <span>금액</span>
        <Input type="number" />
        <PopoverClose className="h-[2rem] w-[3rem] bg-red-10">
          취소
        </PopoverClose>
        <PopoverClose className="h-[2rem] w-[3rem] bg-red-10">
          확인
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
