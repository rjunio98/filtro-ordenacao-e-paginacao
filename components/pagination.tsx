"use client";

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  links: {
    url: string;
    label: string;
    active: boolean;
    id: number;
  }[];
};

export default function Pagination({ links }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClickPage(page: number) {
    const params = new URLSearchParams(searchParams);

    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>

        {links.map((link) => {
          if (link.label.includes("Previous") || link.label.includes("Next")) {
            return null;
          }

          if (link.label === "...") {
            return (
              <PaginationItem
                key={link.id}
                className="hidden md:inline-flex"
              >
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem
              key={link.id}
              className="cursor-pointer"
            >
              <PaginationLink
                onClick={() => handleClickPage(Number(link.label))}
                isActive={link.active}
                dangerouslySetInnerHTML={{ __html: link.label }}
              ></PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>

        {/* 
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink isActive={true}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>2</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>8</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>9</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem> 
        */}
      </PaginationContent>
    </PaginationComponent>
  );
}
