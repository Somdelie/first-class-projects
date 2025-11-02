"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import React from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      signInUrl="/custom-signin"
      signUpUrl="/custom-signin"
      afterSignInUrl="/admin"
      afterSignUpUrl="/admin"
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeContent>
          {/* <TopNav /> */}
          {children}
        </ThemeContent>
      </ThemeProvider>
    </ClerkProvider>
  );
  function ThemeContent({ children }: { children: React.ReactNode }) {
    const { resolvedTheme } = useTheme();
    if (!resolvedTheme) {
      return <div style={{ visibility: "hidden" }}>{children}</div>;
    }
    return <>{children}</>;
  }
}
