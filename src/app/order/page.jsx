"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirectTo = searchParams.get("redirect");
    
    switch (redirectTo) {
      case "new-order":
        router.replace("/order/new-order");
        break;
      case "all":
        router.replace("/order/all");
        break;
      case "cash-shifts":
        router.replace("/order/cash-shifts");
        break;
      case "cashbox-operations":
        router.replace("/order/cashbox-operations");
        break;
    }
  }, [router, searchParams]);

return (
  <div className="flex items-center justify-center h-screen">
    <p className="text-gray-500 text-lg">Yuklanmoqda...</p>
  </div>
);

};

export default Page;