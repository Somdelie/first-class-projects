"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export function AdminAuthButton() {
  return (
    <>
      <SignedOut>
        <Link href="/custom-signin">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Admin
          </Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
            },
          }}
        />
      </SignedIn>
    </>
  );
}
