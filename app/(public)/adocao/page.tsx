import { Suspense } from "react";

import { AdocaoContent } from "@/features/adoption/components/AdocaoContent";

export default function AdocaoPage() {
  return (
    <Suspense fallback={<div className="animate-pulse space-y-4 p-4" />}>
      <AdocaoContent />
    </Suspense>
  );
}
