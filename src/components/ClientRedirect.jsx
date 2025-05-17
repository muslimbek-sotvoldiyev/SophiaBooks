"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClientRedirect() {
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
    <div className="text-center text-gray-500 py-10">
      Yo‘naltirilmoqda...
    </div>
  );
}
