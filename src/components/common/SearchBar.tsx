import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="flex max-w-[480px] gap-[8px] rounded-[8px] bg-gray-10 p-[12px]">
      <Image src="/icons/search.svg" alt="" width={20} height={20} />
      <input
        className="overflow-hidden bg-inherit text-[1.4rem] placeholder:text-[1.4rem] focus:outline-none"
        placeholder="가게 이름으로 찾아보세요"
      />
    </div>
  );
}
