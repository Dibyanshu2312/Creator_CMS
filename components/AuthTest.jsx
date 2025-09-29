"use client";
import { useConvexAuth } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useStoreUser } from "@/Hooks/use-store-user";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";

export function AuthTest() {
  const { isAuthenticated: convexAuth, isLoading: convexLoading } = useConvexAuth();
  const { isSignedIn, isLoaded } = useAuth();
  const { isAuthenticated: userStored, isLoading: userStoring } = useStoreUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Test 1: Call getCurrentUser immediately when convexAuth is true
  const immediateCall = useQuery(api.users.getCurrentUser, convexAuth ? {} : "skip");
  
  // Test 2: Call getCurrentUser only after user is stored
  const safeCall = useQuery(api.users.getCurrentUser, (convexAuth && userStored) ? {} : "skip");

  console.log("=== AUTH TEST ===");
  console.log("Mounted:", mounted);
  console.log("Convex Auth:", convexAuth);
  console.log("Clerk Signed In:", isSignedIn);
  console.log("Clerk Loaded:", isLoaded);
  console.log("User Stored:", userStored);
  console.log("Immediate Call Result:", immediateCall);
  console.log("Safe Call Result:", safeCall);

  if (!mounted) return <div>Not mounted yet...</div>;

  return (
    <div className="p-4 border rounded">
      <h3>Authentication Test</h3>
      <div className="space-y-2 text-sm">
        <p>Mounted: {mounted ? "✅" : "❌"}</p>
        <p>Convex Auth: {convexAuth ? "✅" : "❌"}</p>
        <p>Clerk Signed In: {isSignedIn ? "✅" : "❌"}</p>
        <p>Clerk Loaded: {isLoaded ? "✅" : "❌"}</p>
        <p>User Stored: {userStored ? "✅" : "❌"}</p>
        <hr />
        <p>Immediate Call: {immediateCall ? "✅ Success" : "❌ Failed/Undefined"}</p>
        <p>Safe Call: {safeCall ? "✅ Success" : "❌ Failed/Undefined"}</p>
      </div>
    </div>
  );
}
