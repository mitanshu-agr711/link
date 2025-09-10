"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect to sign-in page after successful logout
        router.push("/auth/signin");
        router.refresh(); // Refresh to update server components
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Button 
      onClick={handleLogout}
      variant="outline"
      size="sm"
    >
      Logout
    </Button>
  );
}
