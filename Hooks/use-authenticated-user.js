"use client";
import { useQuery } from "convex/react";
import { useConvexAuth } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { useStoreUser } from "./use-store-user";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";

/**
 * Custom hook that ensures user is authenticated and stored before calling user-related queries
 * This prevents "Not authenticated" errors by waiting for the complete auth flow
 */
export function useAuthenticatedUser() {
  const { isAuthenticated: convexAuth, isLoading: convexLoading } = useConvexAuth();
  const { isSignedIn, isLoaded } = useAuth();
  const { isAuthenticated: userStored, isLoading: userStoring } = useStoreUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only call getCurrentUser if all conditions are met
  const shouldFetchUser = mounted && convexAuth && isSignedIn && isLoaded && userStored;
  const user = useQuery(api.users.getCurrentUser, shouldFetchUser ? {} : "skip");

  const isLoading = !mounted || convexLoading || !isLoaded || userStoring;
  const isAuthenticated = convexAuth && isSignedIn && userStored;

  return {
    user,
    isLoading,
    isAuthenticated,
    // Detailed state for debugging
    authStates: {
      mounted,
      convexAuth,
      isSignedIn,
      isLoaded,
      userStored,
      shouldFetchUser,
    },
  };
}
