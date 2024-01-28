import { Button } from "@/components/ui/button";

export const RejectButton = () => {
  return (
    <Button className="flex h-[3.2rem] w-[6.9rem] gap-[0.8rem] rounded-[0.6rem] border-[0.1rem] border-primary bg-white px-[1.2rem] py-[0.8rem]">
      <span className="text-center text-[1.2rem] font-normal not-italic leading-[1.6rem] text-primary">
        거절하기
      </span>
    </Button>
  );
};

export const ApproveButton = () => {
  return (
    <Button className="flex h-[3.2rem] w-[6.9rem] gap-[0.8rem] rounded-[0.6rem] border-[0.1rem] border-blue-20 bg-white px-[1.2rem] py-[0.8rem]">
      <span className="text-center text-[1.2rem] font-normal not-italic leading-[1.6rem] text-blue-20">
        승인하기
      </span>
    </Button>
  );
};
