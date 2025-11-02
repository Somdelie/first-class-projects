"use client";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/FirstClass_Logo.png"
              alt="First Class Projects Logo"
              width={200}
              height={120}
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sign in to manage your projects and content
          </p>
        </div>

        {/* Custom styled Clerk SignIn component */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none border-none bg-transparent",
                headerTitle:
                  "text-xl font-semibold text-gray-900 dark:text-white",
                headerSubtitle: "text-gray-600 dark:text-gray-300",
                socialButtonsBlockButton:
                  "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700",
                socialButtonsBlockButtonText: "font-medium",
                dividerLine: "bg-gray-200 dark:bg-gray-600",
                dividerText: "text-gray-500 dark:text-gray-400",
                formFieldLabel: "text-gray-700 dark:text-gray-300 font-medium",
                formFieldInput:
                  "border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200",
                footerActionLink:
                  "text-blue-600 hover:text-blue-700 font-medium",
                identityPreviewText: "text-gray-700 dark:text-gray-300",
                identityPreviewEditButton: "text-blue-600 hover:text-blue-700",
              },
              variables: {
                colorPrimary: "#2563eb",
                colorTextOnPrimaryBackground: "#ffffff",
                borderRadius: "0.5rem",
              },
            }}
            redirectUrl="/admin"
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 First Class Projects. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
