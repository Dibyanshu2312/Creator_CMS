"use client";
import { useState } from "react";
import { useAuthenticatedMutation } from "@/Hooks/use-authenticated-mutation";
import { useAuthenticatedUser } from "@/Hooks/use-authenticated-user";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UsernameForm() {
  const { user } = useAuthenticatedUser();
  const { mutate: updateUsername, isLoading, isReady } = useAuthenticatedMutation(api.users.updateUsername);
  const [username, setUsername] = useState(user?.username || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUsername({ username });
      setMessage("Username updated successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          minLength={3}
          maxLength={20}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Username"}
      </Button>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  );
}
