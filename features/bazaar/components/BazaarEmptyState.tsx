import { InboxIcon } from "lucide-react";
import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { bazaarMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/ui/empty";

export function BazaarEmptyState() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon className="size-5" />
        </EmptyMedia>
        <EmptyTitle>{bazaarMessages.empty.title}</EmptyTitle>
        <EmptyDescription>{bazaarMessages.empty.description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild variant="outline">
          <Link href={PUBLIC_ROUTES.home}>
            {bazaarMessages.empty.backHomeCta}
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
