// app/components/Providers.js
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { ConvexClient } from "convex/browser";
import { ConvexProviderWithAuth } from "convex/react-clerk";
 // adjust path

export function Providers({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: shadesOfPurple }}>
      <ConvexProviderWithAuth client={ConvexClient.fromEnv("CONVEX_URL")}>
        {children}
      </ConvexProviderWithAuth>
    </ClerkProvider>
  );
}
