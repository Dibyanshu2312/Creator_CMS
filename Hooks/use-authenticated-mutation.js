"use client";
import { useMutation } from "convex/react";
import { useConvexAuth } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { useStoreUser } from "./use-store-user";
import { useEffect, useState } from "react";

/**
 * Custom hook that ensures user is authenticated and stored before calling mutations
 * This prevents "Not authenticated" errors by waiting for the complete auth flow
 */
export function useAuthenticatedMutation(mutationApi) {
  const { isAuthenticated: convexAuth, isLoading: convexLoading } = useConvexAuth();
  const { isSignedIn, isLoaded } = useAuth();
  const { isAuthenticated: userStored, isLoading: userStoring } = useStoreUser();
  const [mounted, setMounted] = useState(false);

  const mutation = useMutation(mutationApi);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isReady = mounted && convexAuth && isSignedIn && isLoaded && userStored;
  const isLoading = !mounted || convexLoading || !isLoaded || userStoring;

  // Wrapper function that checks authentication before calling the mutation
  const authenticatedMutation = async (args = {}) => {
    if (!isReady) {
      throw new Error("User not authenticated or not stored in database yet");
    }
    return mutation(args);
  };

  return {
    mutate: authenticatedMutation,
    isLoading,
    isReady,
    // Detailed state for debugging
    authStates: {
      mounted,
      convexAuth,
      isSignedIn,
      isLoaded,
      userStored,
      isReady,
    },
  };
}
