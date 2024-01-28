import Image from "next/image";

function HighHourlyWageBadge() {
  return (
    <div className="flex h-[2.4rem] w-[13.1rem] items-center gap-[0.2rem] rounded-[2rem] bg-primary px-[0.8rem] py-[0.4rem]">
      <span className="items-center text-[1.2rem] font-normal not-italic leading-[1.6rem] text-white">
        기존 시급보다 50%
      </span>
      <div className="relative flex h-[1.6rem] w-[1.6rem] items-center justify-center">
        <Image
          src="/icons/arrow_up_bold.svg"
          alt="윗방향 화살표 이미지"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
}

export default HighHourlyWageBadge;
