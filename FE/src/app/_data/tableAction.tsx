"use client";
import { TestTubeIcon } from "lucide-react";
import Link from "next/link";
import { type Action } from "~/components/data-table/data-table-toolbar";
import { buttonVariants } from "~/components/ui";
import { type CountryType } from "~/schemas/country";

export const actions: Action<CountryType>[] = [
  {
    customComponent: () => {
      return (
        <Link
          href="/questions/create"
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className: "ml-auto hidden h-8 lg:flex",
          })}
        >
          <TestTubeIcon />
          <span>New Question</span>
        </Link>
      );
    },
  },
];
