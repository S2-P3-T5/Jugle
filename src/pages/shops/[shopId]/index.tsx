import { useRouter } from "next/router";

import EmptyShopCard from "@/components/shop/EmptyShopCard";
import ShopDataCard from "@/components/shop/ShopDataCard";

export default function Shop() {
  const hasShopsInfo = true; // 기능 구현 전 임시 설정
  const hasNotice = false; //기능 구현 전 임시 설정
  const router = useRouter();
  const { shopId } = router.query;

  return hasShopsInfo ? (
    <div>
      <ShopDataCard shopId={shopId} />
      {hasNotice ? <div>공고 리스트</div> : <div>공고 등록하기 카드</div>}
    </div>
  ) : (
    <EmptyShopCard />
  );
}
