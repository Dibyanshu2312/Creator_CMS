// src/components/AuthDebug.tsx

 // Or "@clerk/clerk-react" for Vite
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useQuery } from "convex/react";
 // Adjust the path if necessary

export function AuthDebug() {
  // 1. Get Convex auth state
  const { isLoading: isConvexAuthLoading, isAuthenticated } = useConvexAuth();

  // 2. Get Clerk user state
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();

  // 3. Attempt to fetch the Convex user, but only if authenticated by Convex
   const convexUser = useQuery(
    api.users.getCurrentUser,
    isAuthenticated ? {} : "skip"
  );

  // We will log everything to the console for inspection
  console.log("--- Auth Debug Component ---");
  console.log("Clerk isLoaded:", isClerkLoaded);
  console.log("Convex auth isLoading:", isConvexAuthLoading);
  console.log("Convex isAuthenticated:", isAuthenticated);
  console.log("Clerk User Object:", clerkUser);
  console.log("Convex User from DB:", convexUser);
  
  console.log("----------------------------");

  return (
     <div style={{ border: '3px solid #0070f3', padding: '1rem', margin: '1rem', borderRadius: '8px' }}>
      <h2>Authentication Debug Status</h2>
      <p>
        <strong>Clerk Status:</strong> {isClerkLoaded ? "Loaded" : "Loading..."}
      </p>
      <p>
        <strong>Clerk User:</strong> {clerkUser ? `Logged in as ${clerkUser.fullName}` : "Not logged in"}
      </p>
      <hr style={{ margin: '1rem 0' }} />
      <p>
        <strong>Convex Auth Status (from `useConvexAuth`):</strong> {isAuthenticated ? "Authenticated" : "NOT Authenticated"}
      </p>
      <p>
        <strong>Convex User from DB (`useQuery`):</strong> {convexUser === undefined ? "Loading or query skipped..." : convexUser === null ? "User not found in DB." : `Success! Welcome, ${convexUser.name}`}
      </p>
      <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'gray' }}>
        (If you are authenticated but your app still crashes, check the main console for the original 'Not Authenticated' error.)
      </p>
    </div>
  );
}